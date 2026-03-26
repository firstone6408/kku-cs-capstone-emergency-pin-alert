package com.kku.emergency_alert_api.dto.incident;

import lombok.Getter;
import lombok.Setter;

// Request DTO สำหรับยืนยันช่วยเหลือสำเร็จ
@Getter
@Setter
public class CompleteIncidentRequestDTO {

    // หมายเหตุ (ไม่บังคับ)
    private String note;
}
