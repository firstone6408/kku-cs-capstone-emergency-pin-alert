package com.kku.emergency_alert_api.dto.incident_type;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncidentTypeActiveChangeRequestDTO {
    @NotNull(message = "isActive is required")
    private Boolean isActive;
}
