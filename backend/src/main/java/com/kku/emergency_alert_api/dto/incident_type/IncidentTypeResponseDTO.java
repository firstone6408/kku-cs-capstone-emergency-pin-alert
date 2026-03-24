package com.kku.emergency_alert_api.dto.incident_type;

import com.kku.emergency_alert_api.entity.IncidentTypeEntity;

import lombok.Builder;
import lombok.Getter;

// Response DTO สำหรับประเภทเหตุฉุกเฉิน
@Getter
@Builder
public class IncidentTypeResponseDTO {
    private final Long id;
    private final String name;
    private final Integer priorityLevel;

    public static IncidentTypeResponseDTO fromEntity(IncidentTypeEntity entity) {
        return IncidentTypeResponseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .priorityLevel(entity.getPriorityLevel())
                .build();
    }
}
