package com.kku.emergency_alert_api.dto.incident_type;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncidentTypeRequestDTO {
    @NotBlank(message = "Name is required")
    private String name;

    @Min(value = 1, message = "Priority level must be at least 1")
    @Max(value = 5, message = "Priority level must be at most 5")
    private Integer priorityLevel;
}
