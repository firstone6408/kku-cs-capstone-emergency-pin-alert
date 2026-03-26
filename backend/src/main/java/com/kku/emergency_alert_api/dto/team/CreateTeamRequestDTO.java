package com.kku.emergency_alert_api.dto.team;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// Request DTO สำหรับสร้างทีมใหม่
@Getter
@Setter
public class CreateTeamRequestDTO {

    @NotBlank(message = "กรุณาระบุชื่อทีม")
    private String name;
}
