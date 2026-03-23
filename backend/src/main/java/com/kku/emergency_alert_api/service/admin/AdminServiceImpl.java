package com.kku.emergency_alert_api.service.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.kku.emergency_alert_api.constant.BlockActionEnum;
import com.kku.emergency_alert_api.constant.UserRoleEnum;
import com.kku.emergency_alert_api.context.UserContextProvider;
import com.kku.emergency_alert_api.dto.admin.AdminBlockStatusUserRequestDTO;
import com.kku.emergency_alert_api.dto.admin.AdminRequestDTO;
import com.kku.emergency_alert_api.dto.admin.AdminResponseDTO;
import com.kku.emergency_alert_api.dto.auth.LoginRequestDTO;
import com.kku.emergency_alert_api.dto.auth.LoginResponseDTO;
import com.kku.emergency_alert_api.entity.AdminEntity;
import com.kku.emergency_alert_api.entity.BlockHistoryEntity;
import com.kku.emergency_alert_api.entity.ReporterEntity;
import com.kku.emergency_alert_api.entity.StaffEntity;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;
import com.kku.emergency_alert_api.exception.UnauthorizedException;
import com.kku.emergency_alert_api.repository.AdminRepository;
import com.kku.emergency_alert_api.repository.BlockHistoryRepository;
import com.kku.emergency_alert_api.repository.ReporterRepository;
import com.kku.emergency_alert_api.repository.StaffRepository;
import com.kku.emergency_alert_api.util.JwtUtil;

@Service
public class AdminServiceImpl implements AdminService {
    private final AdminRepository adminRepository;
    private final ReporterRepository reporterRepository;
    private final StaffRepository staffRepository;
    private final BlockHistoryRepository blockHistoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserContextProvider userContextProvider;

    public AdminServiceImpl(AdminRepository adminRepository, ReporterRepository reporterRepository,
            StaffRepository staffRepository, BlockHistoryRepository blockHistoryRepository,
            PasswordEncoder passwordEncoder, JwtUtil jwtUtil, UserContextProvider userContextProvider) {
        this.adminRepository = adminRepository;
        this.reporterRepository = reporterRepository;
        this.staffRepository = staffRepository;
        this.blockHistoryRepository = blockHistoryRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userContextProvider = userContextProvider;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminResponseDTO> getAll() {
        List<AdminEntity> admins = adminRepository.findAll();
        return admins.stream().map(AdminResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AdminResponseDTO getById(Long id) {
        AdminEntity admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
        return AdminResponseDTO.fromEntity(admin);
    }

    @Override
    @Transactional
    public AdminResponseDTO create(AdminRequestDTO requestDTO) {
        if (adminRepository.existsByEmail(requestDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(requestDTO.getPassword());

        AdminEntity adminToCreate = new AdminEntity();
        adminToCreate.setEmail(requestDTO.getEmail());
        adminToCreate.setFullName(requestDTO.getFullName());
        adminToCreate.setPhone(requestDTO.getPhone());
        adminToCreate.setPasswordHash(encodedPassword);

        AdminEntity created = adminRepository.save(adminToCreate);
        return AdminResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public AdminResponseDTO update(Long id, AdminRequestDTO requestDTO) {
        AdminEntity adminToUpdate = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));

        // เช็คว่า email ไม่ซ้ำกับคนอื่น
        if (!adminToUpdate.getEmail().equals(requestDTO.getEmail())
                && adminRepository.existsByEmail(requestDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        adminToUpdate.setEmail(requestDTO.getEmail());
        adminToUpdate.setFullName(requestDTO.getFullName());

        // เปลี่ยนรหัสผ่าน
        if (requestDTO.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(requestDTO.getPassword());
            adminToUpdate.setPasswordHash(encodedPassword);
        }

        AdminEntity updated = adminRepository.save(adminToUpdate);
        return AdminResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AdminEntity adminToDelete = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));

        adminRepository.delete(adminToDelete);
    }

    @Override
    @Transactional
    public LoginResponseDTO loginAdmin(LoginRequestDTO requestDTO) {
        AdminEntity admin = adminRepository.findByEmail(requestDTO.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        // เช็ค password
        boolean isValid = passwordEncoder.matches(requestDTO.getPassword(), admin.getPasswordHash());
        if (!isValid) {
            throw new UnauthorizedException("Invalid email or password");
        }

        // สร้าง token
        String token = jwtUtil.generateToken(admin.getId() + ":" + UserRoleEnum.ADMIN.name());

        return LoginResponseDTO.fromEntity(admin, token);
    }

    @Override
    @Transactional
    public void changeBlockStatusAndSaveHistory(Long targetId, AdminBlockStatusUserRequestDTO requestDTO) {
        if (requestDTO.getTargetType() == UserRoleEnum.ADMIN) {
            throw new IllegalArgumentException("Cannot block admin");
        }

        switch (requestDTO.getTargetType()) {
            case REPORTER:
                ReporterEntity reporter = reporterRepository.findById(targetId)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Reporter not found with id: " + targetId));
                reporter.setIsBlocked(requestDTO.getAction() == BlockActionEnum.BLOCK);

                // update
                reporterRepository.save(reporter);
                break;
            case STAFF:
                StaffEntity staff = staffRepository.findById(targetId)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Staff not found with id: " + targetId));
                staff.setIsBlocked(requestDTO.getAction() == BlockActionEnum.BLOCK);

                // update
                staffRepository.save(staff);
                break;
            default:
                throw new IllegalArgumentException("Invalid target type");
        }

        // บันทึกประวัติ
        BlockHistoryEntity blockHistoryToCreate = new BlockHistoryEntity();
        blockHistoryToCreate.setAdmin(adminRepository.findById(userContextProvider.getCurrentUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found")));
        blockHistoryToCreate.setTargetType(requestDTO.getTargetType());
        blockHistoryToCreate.setTargetId(targetId);
        blockHistoryToCreate.setAction(requestDTO.getAction());
        blockHistoryToCreate.setReason(requestDTO.getReason());

        blockHistoryRepository.save(blockHistoryToCreate);
    }

}
