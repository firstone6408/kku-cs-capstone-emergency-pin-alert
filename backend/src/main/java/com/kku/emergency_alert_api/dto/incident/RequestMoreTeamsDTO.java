package com.kku.emergency_alert_api.dto.incident;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

// Request DTO สำหรับขอทีมเพิ่ม
@Getter
@Setter
public class RequestMoreTeamsDTO {

    @NotNull(message = "กรุณาระบุจำนวนทีมที่ต้องการเพิ่ม")
    @Min(value = 1, message = "ต้องเพิ่มอย่างน้อย 1 ทีม")
    private Integer additionalTeams;

    // เหตุผล (ไม่บังคับ)
    private String reason;
}
