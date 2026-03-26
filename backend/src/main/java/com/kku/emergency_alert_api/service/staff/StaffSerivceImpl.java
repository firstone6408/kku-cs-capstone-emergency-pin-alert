package com.kku.emergency_alert_api.service.staff;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kku.emergency_alert_api.constant.TeamStatusEnum;
import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.dto.staff.StaffRequestDTO;
import com.kku.emergency_alert_api.dto.team.TeamResponseDTO;
import com.kku.emergency_alert_api.entity.StaffEntity;
import com.kku.emergency_alert_api.entity.TeamEntity;
import com.kku.emergency_alert_api.entity.TeamMemberEntity;
import com.kku.emergency_alert_api.exception.BusinessException;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;
import com.kku.emergency_alert_api.repository.StaffRepository;
import com.kku.emergency_alert_api.repository.TeamMemberRepository;
import com.kku.emergency_alert_api.repository.TeamRepository;

@Service
public class StaffSerivceImpl implements StaffService {
    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;

    public StaffSerivceImpl(StaffRepository staffRepository, PasswordEncoder passwordEncoder,
            TeamRepository teamRepository, TeamMemberRepository teamMemberRepository) {
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserPrincipalResponseDTO> getAll() {
        List<StaffEntity> staffs = staffRepository.findAll();
        return staffs.stream().map(UserPrincipalResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserPrincipalResponseDTO getById(Long id) {
        StaffEntity staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));
        return UserPrincipalResponseDTO.fromEntity(staff);
    }

    @Override
    @Transactional
    public UserPrincipalResponseDTO create(StaffRequestDTO dto) {
        if (staffRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceNotFoundException("Email already exists");
        }

        StaffEntity staffToCreate = new StaffEntity();
        staffToCreate.setEmail(dto.getEmail());
        staffToCreate.setFullName(dto.getFullName());
        staffToCreate.setPhone(dto.getPhone());
        staffToCreate.setStaffRole(dto.getStaffRole());

        if (dto.getPassword() == null) {
            throw new ResourceNotFoundException("Password is required");
        }
        staffToCreate.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        staffToCreate.setIsBlocked(false);

        StaffEntity created = staffRepository.save(staffToCreate);
        return UserPrincipalResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public UserPrincipalResponseDTO update(Long id, StaffRequestDTO dto) {
        if (!staffRepository.existsById(id)) {
            throw new ResourceNotFoundException("Staff not found with id: " + id);
        }

        StaffEntity staffToUpdate = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        if (!staffToUpdate.getEmail().equals(dto.getEmail())
                && staffRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceNotFoundException("Email already exists");
        }

        staffToUpdate.setEmail(dto.getEmail());
        staffToUpdate.setFullName(dto.getFullName());
        staffToUpdate.setPhone(dto.getPhone());
        staffToUpdate.setStaffRole(dto.getStaffRole());
        if (dto.getPassword() != null) {
            staffToUpdate.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        StaffEntity updated = staffRepository.save(staffToUpdate);
        return UserPrincipalResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StaffEntity staffToDelete = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));
        staffRepository.delete(staffToDelete);
    }

    @Override
    @Transactional(readOnly = true)
    public TeamResponseDTO getMyTeam(Long staffId) {
        TeamMemberEntity currentMembership = teamMemberRepository.findByStaffIdAndLeftAtIsNull(staffId)
                .orElse(null);

        if (currentMembership == null) {
            return null;
        }
        return TeamResponseDTO.fromEntity(currentMembership.getTeam());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamResponseDTO> getAllTeams() {
        List<TeamEntity> teams = teamRepository.findAll();
        return teams.stream().map(TeamResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public TeamResponseDTO createTeam(Long staffId, String teamName) {
        StaffEntity staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + staffId));

        leaveCurrentTeamIfExists(staffId);

        TeamEntity teamToCreate = new TeamEntity();
        teamToCreate.setName(teamName);
        teamToCreate.setStatus(TeamStatusEnum.AVAILABLE);
        TeamEntity created = teamRepository.save(teamToCreate);

        TeamMemberEntity membership = new TeamMemberEntity();
        membership.setTeam(created);
        membership.setStaff(staff); // join team
        teamMemberRepository.save(membership);

        return TeamResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public TeamResponseDTO joinTeam(Long staffId, Long teamId) {
        StaffEntity staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + staffId));

        TeamEntity team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + teamId));

        if (teamMemberRepository.existsByTeamIdAndStaffIdAndLeftAtIsNull(teamId, staffId)) {
            throw new BusinessException(HttpStatus.CONFLICT, "คุณอยู่ในทีมนี้อยู่แล้ว");
        }

        leaveCurrentTeamIfExists(staffId);

        TeamMemberEntity membership = new TeamMemberEntity();
        membership.setTeam(team);
        membership.setStaff(staff); // join team
        teamMemberRepository.save(membership);

        return TeamResponseDTO.fromEntity(team);
    }

    @Override
    @Transactional
    public void leaveTeam(Long staffId) {
        TeamMemberEntity membership = teamMemberRepository.findByStaffIdAndLeftAtIsNull(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("คุณไม่ได้อยู่ในทีมใด"));

        if (membership.getTeam().getStatus() == TeamStatusEnum.ON_MISSION) {
            throw new BusinessException(HttpStatus.BAD_REQUEST,
                    "ไม่สามารถย้ายทีมได้ — ทีมปัจจุบันกำลังปฏิบัติภารกิจอยู่");
        }
        membership.setLeftAt(LocalDateTime.now());
        teamMemberRepository.save(membership);
    }

    @Override
    @Transactional
    public TeamResponseDTO kickMember(Long staffId, Long memberId) {
        TeamMemberEntity targetMember = teamMemberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("ไม่พบสมาชิก"));

        if (targetMember.getLeftAt() != null) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "สมาชิกนี้ออกจากทีมไปแล้ว");
        }

        TeamMemberEntity myMembership = teamMemberRepository.findByStaffIdAndLeftAtIsNull(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("คุณไม่ได้อยู่ในทีมใด"));

        if (!myMembership.getTeam().getId().equals(targetMember.getTeam().getId())) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "ไม่สามารถเตะสมาชิกจากทีมอื่นได้");
        }

        if (targetMember.getStaff().getId().equals(staffId)) {
            throw new BusinessException(HttpStatus.BAD_REQUEST,
                    "ไม่สามารถเตะตัวเองได้ — ใช้ \"ออกจากทีม\" แทน");
        }

        if (myMembership.getTeam().getStatus() == TeamStatusEnum.ON_MISSION) {
            throw new BusinessException(HttpStatus.BAD_REQUEST,
                    "ไม่สามารถเตะสมาชิกได้ — ทีมกำลังปฏิบัติภารกิจอยู่");
        }

        targetMember.setLeftAt(LocalDateTime.now());
        teamMemberRepository.save(targetMember);

        return TeamResponseDTO.fromEntity(myMembership.getTeam());
    }

    private void leaveCurrentTeamIfExists(Long staffId) {
        teamMemberRepository.findByStaffIdAndLeftAtIsNull(staffId)
                .ifPresent(membership -> {
                    if (membership.getTeam().getStatus() == TeamStatusEnum.ON_MISSION) {
                        throw new BusinessException(HttpStatus.BAD_REQUEST,
                                "ไม่สามารถย้ายทีมได้ — ทีมปัจจุบันกำลังปฏิบัติภารกิจอยู่");
                    }
                    membership.setLeftAt(LocalDateTime.now());
                    teamMemberRepository.save(membership);
                });
    }

}
