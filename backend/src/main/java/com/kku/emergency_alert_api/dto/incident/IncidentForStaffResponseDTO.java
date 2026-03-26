package com.kku.emergency_alert_api.dto.incident;

import java.util.List;

import com.kku.emergency_alert_api.entity.IncidentEntity;

import lombok.Builder;
import lombok.Getter;

// Response DTO สำหรับรายละเอียด incident ฝั่ง Staff — รวมข้อมูลผู้แจ้ง, ทีมที่ assign, evidence
@Getter
@Builder
public class IncidentForStaffResponseDTO {

        private final IncidentResponseDTO incident;
        private final List<IncidentAssignmentResponseDTO> assignments;
        private final Integer currentTeams; // จำนวนทีมที่รับงานแล้ว

        public static IncidentForStaffResponseDTO fromEntity(IncidentEntity entity) {
                return IncidentForStaffResponseDTO.builder()
                                .incident(IncidentResponseDTO.fromEntity(entity))
                                .assignments(entity.getAssignments() != null
                                                ? entity.getAssignments().stream()
                                                                .map(IncidentAssignmentResponseDTO::fromEntity)
                                                                .toList()
                                                : null)
                                .currentTeams(null)
                                .build();
        }

        public static IncidentForStaffResponseDTO fromEntity(IncidentEntity entity, int currentTeams) {
                return IncidentForStaffResponseDTO.builder()
                                .incident(IncidentResponseDTO.fromEntity(entity))
                                .assignments(entity.getAssignments() != null
                                                ? entity.getAssignments().stream()
                                                                .map(IncidentAssignmentResponseDTO::fromEntity)
                                                                .toList()
                                                : null)
                                .currentTeams(currentTeams)
                                .build();
        }
}
