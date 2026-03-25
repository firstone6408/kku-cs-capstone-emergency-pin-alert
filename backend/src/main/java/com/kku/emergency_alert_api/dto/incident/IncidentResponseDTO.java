package com.kku.emergency_alert_api.dto.incident;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.kku.emergency_alert_api.entity.IncidentEntity;

import lombok.Builder;
import lombok.Getter;

// Response DTO สำหรับรายละเอียดรายการแจ้งเหตุ (full detail)
@Getter
@Builder
public class IncidentResponseDTO {
    private final Long id;

    // ข้อมูลประเภทเหตุ
    private final String incidentTypeName;
    private final Integer incidentTypePriorityLevel;

    private final String description;
    private final String contactPhone;
    private final BigDecimal latitude;
    private final BigDecimal longitude;
    private final String status;
    private final Integer maxTeams;

    // หลักฐาน
    private final List<IncidentEvidenceResponseDTO> evidence;

    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static IncidentResponseDTO fromEntity(IncidentEntity entity) {
        return IncidentResponseDTO.builder()
                .id(entity.getId())
                .incidentTypeName(entity.getIncidentType().getName())
                .incidentTypePriorityLevel(entity.getIncidentType().getPriorityLevel())
                .description(entity.getDescription())
                .contactPhone(entity.getContactPhone())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .status(entity.getStatus().name())
                .maxTeams(entity.getMaxTeams())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .evidence(entity.getEvidence() != null
                        ? entity.getEvidence().stream()
                                .map(IncidentEvidenceResponseDTO::fromEntity)
                                .toList()
                        : null)
                .build();
    }
}
