package com.kku.emergency_alert_api.dto.incident;

import java.time.LocalDateTime;

import com.kku.emergency_alert_api.constant.AssignmentStatusEnum;
import com.kku.emergency_alert_api.dto.team.TeamResponseDTO;
import com.kku.emergency_alert_api.entity.IncidentAssignmentEntity;

import lombok.Builder;
import lombok.Getter;

// Response DTO สำหรับทีมที่ถูก assign ใน incident (แสดงในหน้ารายละเอียด)
@Getter
@Builder
public class IncidentAssignmentResponseDTO {
    private final Long id;
    private final TeamResponseDTO team;
    private final AssignmentStatusEnum status;
    private final LocalDateTime assignedAt;
    private final LocalDateTime completedAt;

    public static IncidentAssignmentResponseDTO fromEntity(IncidentAssignmentEntity entity) {
        return IncidentAssignmentResponseDTO.builder()
                .id(entity.getId())
                .team(TeamResponseDTO.fromEntity(entity.getTeam()))
                .status(entity.getStatus())
                .assignedAt(entity.getAssignedAt())
                .completedAt(entity.getCompletedAt())
                .build();
    }
}
