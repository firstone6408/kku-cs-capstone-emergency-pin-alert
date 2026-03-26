package com.kku.emergency_alert_api.service.incident_assignment;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kku.emergency_alert_api.constant.AssignmentStatusEnum;
import com.kku.emergency_alert_api.constant.IncidentStatusEnum;
import com.kku.emergency_alert_api.constant.TeamStatusEnum;
import com.kku.emergency_alert_api.dto.incident.CompleteIncidentRequestDTO;
import com.kku.emergency_alert_api.dto.incident.IncidentForStaffResponseDTO;
import com.kku.emergency_alert_api.dto.incident.RequestMoreTeamsDTO;
import com.kku.emergency_alert_api.entity.IncidentAssignmentEntity;
import com.kku.emergency_alert_api.entity.IncidentAssignmentMemberEntity;
import com.kku.emergency_alert_api.entity.IncidentEntity;
import com.kku.emergency_alert_api.entity.TeamEntity;
import com.kku.emergency_alert_api.entity.TeamMemberEntity;
import com.kku.emergency_alert_api.exception.BusinessException;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;
import com.kku.emergency_alert_api.repository.IncidentAssignmentMemberRepository;
import com.kku.emergency_alert_api.repository.IncidentAssignmentRepository;
import com.kku.emergency_alert_api.repository.IncidentRepository;
import com.kku.emergency_alert_api.repository.TeamMemberRepository;
import com.kku.emergency_alert_api.repository.TeamRepository;

@Service
public class IncidentAssignmentServiceImpl implements IncidentAssignmentService {

        private final IncidentRepository incidentRepository;
        private final IncidentAssignmentRepository assignmentRepository;
        private final IncidentAssignmentMemberRepository assignmentMemberRepository;
        private final TeamRepository teamRepository;
        private final TeamMemberRepository teamMemberRepository;

        public IncidentAssignmentServiceImpl(
                        IncidentRepository incidentRepository,
                        IncidentAssignmentRepository assignmentRepository,
                        IncidentAssignmentMemberRepository assignmentMemberRepository,
                        TeamRepository teamRepository,
                        TeamMemberRepository teamMemberRepository) {
                this.incidentRepository = incidentRepository;
                this.assignmentRepository = assignmentRepository;
                this.assignmentMemberRepository = assignmentMemberRepository;
                this.teamRepository = teamRepository;
                this.teamMemberRepository = teamMemberRepository;
        }

        // ==================== READ ====================

        @Override
        @Transactional(readOnly = true)
        public List<IncidentForStaffResponseDTO> getIncidentsForStaff(IncidentStatusEnum status) {
                List<IncidentEntity> incidents;

                if (status != null) {
                        incidents = incidentRepository
                                        .findByStatusOrderByIncidentType_PriorityLevelAscCreatedAtDesc(status);
                } else {
                        // แสดงเฉพาะสถานะที่ staff ดูแลได้
                        incidents = incidentRepository
                                        .findByStatusInOrderByIncidentType_PriorityLevelAscCreatedAtDesc(
                                                        List.of(IncidentStatusEnum.REPORTED,
                                                                        IncidentStatusEnum.IN_PROGRESS,
                                                                        IncidentStatusEnum.NEED_MORE_TEAMS));
                }

                return incidents.stream()
                                .map(incident -> {
                                        int currentTeams = (int) assignmentRepository
                                                        .countByIncidentIdAndStatus(incident.getId(),
                                                                        AssignmentStatusEnum.ACCEPTED);
                                        return IncidentForStaffResponseDTO.fromEntity(incident, currentTeams);
                                })
                                .toList();
        }

        @Override
        @Transactional(readOnly = true)
        public IncidentForStaffResponseDTO getIncidentDetailForStaff(Long incidentId) {
                IncidentEntity incident = incidentRepository.findById(incidentId)
                                .orElseThrow(() -> new ResourceNotFoundException("Incident not found"));
                return IncidentForStaffResponseDTO.fromEntity(incident);
        }

        @Override
        @Transactional(readOnly = true)
        public IncidentForStaffResponseDTO getMyActiveMission(Long staffId) {
                // หาทีมปัจจุบันของ staff
                TeamMemberEntity membership = teamMemberRepository.findByStaffIdAndLeftAtIsNull(staffId)
                                .orElseThrow(() -> new ResourceNotFoundException("Staff does not belong to any team"));

                // หา active assignment ของทีม (status = ACCEPTED)
                List<IncidentAssignmentEntity> activeAssignments = assignmentRepository
                                .findByTeamIdAndStatus(membership.getTeam().getId(), AssignmentStatusEnum.ACCEPTED);

                if (activeAssignments.isEmpty()) {
                        return null; // ไม่มี active mission
                }

                // คืนรายละเอียด incident ของ assignment แรก (1 ทีมรับได้ 1 งาน ณ เวลาหนึ่ง)
                return IncidentForStaffResponseDTO.fromEntity(activeAssignments.get(0).getIncident());
        }

        // ==================== ACTIONS ====================

        @Override
        @Transactional
        public IncidentForStaffResponseDTO acceptIncident(Long staffId, Long incidentId) {
                // 1. หาทีมปัจจุบันของ staff
                TeamMemberEntity membership = teamMemberRepository.findByStaffIdAndLeftAtIsNull(staffId)
                                .orElseThrow(() -> new ResourceNotFoundException("Staff does not belong to any team"));

                TeamEntity team = membership.getTeam();

                // 2. เช็ก: ทีม AVAILABLE ไหม?
                if (team.getStatus() != TeamStatusEnum.AVAILABLE) {
                        throw new BusinessException(HttpStatus.BAD_REQUEST,
                                        "Team is currently on a mission — cannot accept new incident");
                }

                // 3. หา incident
                IncidentEntity incident = incidentRepository.findById(incidentId)
                                .orElseThrow(() -> new ResourceNotFoundException("Incident not found"));

                // 4. เช็ก: incident status เป็น REPORTED หรือ NEED_MORE_TEAMS?
                if (incident.getStatus() != IncidentStatusEnum.REPORTED
                                && incident.getStatus() != IncidentStatusEnum.NEED_MORE_TEAMS) {
                        throw new BusinessException(HttpStatus.BAD_REQUEST,
                                        "Incident is not available for acceptance — status: " + incident.getStatus());
                }

                // 5. เช็ก: ทีมเคยรับ incident นี้แล้วหรือยัง?
                if (assignmentRepository.existsByIncidentIdAndTeamIdAndStatus(
                                incidentId, team.getId(), AssignmentStatusEnum.ACCEPTED)) {
                        throw new BusinessException(HttpStatus.CONFLICT,
                                        "Team already has an active assignment for this incident");
                }

                // 6. เช็ก: ยังรับทีมได้? (current < max_teams)
                long currentTeamCount = assignmentRepository.countByIncidentIdAndStatus(
                                incidentId, AssignmentStatusEnum.ACCEPTED);
                if (currentTeamCount >= incident.getMaxTeams()) {
                        throw new BusinessException(HttpStatus.BAD_REQUEST,
                                        "Incident has reached maximum team capacity (" + incident.getMaxTeams() + ")");
                }

                // 7. สร้าง Assignment
                IncidentAssignmentEntity assignment = new IncidentAssignmentEntity();
                assignment.setIncident(incident);
                assignment.setTeam(team);
                assignment.setStatus(AssignmentStatusEnum.ACCEPTED);
                assignmentRepository.save(assignment);

                // 8. Snapshot สมาชิกทีมปัจจุบัน
                List<TeamMemberEntity> activeMembers = teamMemberRepository
                                .findByTeamIdAndLeftAtIsNull(team.getId());

                for (TeamMemberEntity member : activeMembers) {
                        IncidentAssignmentMemberEntity memberSnapshot = new IncidentAssignmentMemberEntity();
                        memberSnapshot.setAssignment(assignment);
                        memberSnapshot.setStaff(member.getStaff());
                        memberSnapshot.setRoleAtTime(member.getStaff().getRole().name());
                        assignmentMemberRepository.save(memberSnapshot);
                }

                // 9. Team status → ON_MISSION
                team.setStatus(TeamStatusEnum.ON_MISSION);
                teamRepository.save(team);

                // 10. Incident status → IN_PROGRESS
                incident.setStatus(IncidentStatusEnum.IN_PROGRESS);
                incidentRepository.save(incident);

                // Return updated detail
                return IncidentForStaffResponseDTO.fromEntity(incident);
        }

        @Override
        @Transactional
        public IncidentForStaffResponseDTO requestMoreTeams(Long staffId, Long incidentId,
                        RequestMoreTeamsDTO dto) {
                // หา active assignment ของทีม staff
                IncidentAssignmentEntity assignment = findActiveAssignment(staffId, incidentId);

                IncidentEntity incident = assignment.getIncident();

                // เช็กสถานะ incident (ต้อง IN_PROGRESS หรือ NEED_MORE_TEAMS)
                if (incident.getStatus() != IncidentStatusEnum.IN_PROGRESS
                                && incident.getStatus() != IncidentStatusEnum.NEED_MORE_TEAMS) {
                        throw new BusinessException(HttpStatus.BAD_REQUEST,
                                        "Cannot request more teams — incident status: " + incident.getStatus());
                }

                // เพิ่ม maxTeams
                incident.setMaxTeams(incident.getMaxTeams() + dto.getAdditionalTeams());

                // เปลี่ยน status เป็น NEED_MORE_TEAMS
                incident.setStatus(IncidentStatusEnum.NEED_MORE_TEAMS);
                incidentRepository.save(incident);

                return IncidentForStaffResponseDTO.fromEntity(incident);
        }

        @Override
        @Transactional
        public IncidentForStaffResponseDTO completeIncident(Long staffId, Long incidentId,
                        CompleteIncidentRequestDTO dto) {
                // หา active assignment ของทีม staff
                IncidentAssignmentEntity assignment = findActiveAssignment(staffId, incidentId);

                // Assignment → COMPLETED
                assignment.setStatus(AssignmentStatusEnum.COMPLETED);
                assignment.setCompletedAt(LocalDateTime.now());
                assignmentRepository.save(assignment);

                // Team → AVAILABLE
                TeamEntity team = assignment.getTeam();
                team.setStatus(TeamStatusEnum.AVAILABLE);
                teamRepository.save(team);

                // เช็กว่าทุก assignment ของ incident เป็น COMPLETED หรือยัง
                IncidentEntity incident = assignment.getIncident();
                long acceptedCount = assignmentRepository.countByIncidentIdAndStatus(
                                incidentId, AssignmentStatusEnum.ACCEPTED);

                if (acceptedCount == 0) {
                        // ทุกทีมทำเสร็จแล้ว → Incident COMPLETED
                        incident.setStatus(IncidentStatusEnum.COMPLETED);
                        incidentRepository.save(incident);
                }

                // Return updated detail
                return IncidentForStaffResponseDTO.fromEntity(incident);
        }

        @Override
        @Transactional
        public IncidentForStaffResponseDTO cancelAssignment(Long staffId, Long incidentId) {
                // หา active assignment ของทีม staff
                IncidentAssignmentEntity assignment = findActiveAssignment(staffId, incidentId);

                // Assignment → CANCELLED
                assignment.setStatus(AssignmentStatusEnum.CANCELLED);
                assignmentRepository.save(assignment);

                // Team → AVAILABLE
                TeamEntity team = assignment.getTeam();
                team.setStatus(TeamStatusEnum.AVAILABLE);
                teamRepository.save(team);

                // ถ้าไม่มีทีม ACCEPTED เหลือ → Incident กลับเป็น REPORTED
                IncidentEntity incident = assignment.getIncident();
                long acceptedCount = assignmentRepository.countByIncidentIdAndStatus(
                                incidentId, AssignmentStatusEnum.ACCEPTED);

                if (acceptedCount == 0) {
                        incident.setStatus(IncidentStatusEnum.REPORTED);
                        incidentRepository.save(incident);
                }

                // Return updated detail
                return IncidentForStaffResponseDTO.fromEntity(incident);
        }

        // ==================== PRIVATE HELPERS ====================

        /**
         * หา active assignment (ACCEPTED) ของทีมที่ staff อยู่ ใน incident ที่ระบุ
         *
         * @throws ResourceNotFoundException ถ้า staff ไม่มีทีม หรือไม่มี active
         *                                   assignment
         */
        private IncidentAssignmentEntity findActiveAssignment(Long staffId, Long incidentId) {
                // หาทีมปัจจุบันของ staff
                TeamMemberEntity membership = teamMemberRepository.findByStaffIdAndLeftAtIsNull(staffId)
                                .orElseThrow(() -> new ResourceNotFoundException("Staff does not belong to any team"));

                // หา assignment ของทีมใน incident นี้ (สถานะ ACCEPTED)
                return assignmentRepository
                                .findByIncidentIdAndTeamIdAndStatus(incidentId, membership.getTeam().getId(),
                                                AssignmentStatusEnum.ACCEPTED)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "No active assignment found for this team in incident #" + incidentId));
        }
}
