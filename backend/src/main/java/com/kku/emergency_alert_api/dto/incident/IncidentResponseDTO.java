package com.kku.emergency_alert_api.dto.incident;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.kku.emergency_alert_api.constant.IncidentStatusEnum;
import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeResponseDTO;
import com.kku.emergency_alert_api.entity.IncidentEntity;

import lombok.Builder;
import lombok.Getter;

// Response DTO สำหรับรายละเอียดรายการแจ้งเหตุ (full detail)
@Getter
@Builder
public class IncidentResponseDTO {
    private final Long id;
    private final String incidentCode;

    // ข้อมูลประเภทเหตุ
    private final IncidentTypeResponseDTO incidentType;

    private final String description;
    private final String contactPhone;
    private final String address;
    private final BigDecimal latitude;
    private final BigDecimal longitude;
    private final IncidentStatusEnum status;
    private final Integer maxTeams;

    // หลักฐาน
    private final List<IncidentEvidenceResponseDTO> evidence;

    private final UserPrincipalResponseDTO reporter;

    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static IncidentResponseDTO fromEntity(IncidentEntity entity) {
        return IncidentResponseDTO.builder()
                .id(entity.getId())
                .incidentCode(entity.getIncidentCode())
                .incidentType(IncidentTypeResponseDTO.fromEntity(entity.getIncidentType()))
                .description(entity.getDescription())
                .contactPhone(entity.getContactPhone())
                .address(entity.getAddress())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .status(entity.getStatus())
                .maxTeams(entity.getMaxTeams())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .evidence(entity.getEvidence() != null
                        ? entity.getEvidence().stream()
                                .map(IncidentEvidenceResponseDTO::fromEntity)
                                .toList()
                        : List.of())
                .reporter(UserPrincipalResponseDTO.fromEntity(entity.getReporter()))
                .build();
    }
}
