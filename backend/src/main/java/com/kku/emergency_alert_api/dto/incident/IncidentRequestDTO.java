package com.kku.emergency_alert_api.dto.incident;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/*
 * Request DTO สำหรับแจ้งเหตุใหม่
 *
 * ใช้กับ multipart request:
 * - ส่วน JSON จะ bind กับ DTO นี้ (ผ่าน @RequestPart)
 * - ส่วนไฟล์จะเป็น MultipartFile[] แยกต่างหาก
 */
@Getter
@Setter
public class IncidentRequestDTO {

    @NotNull(message = "กรุณาเลือกประเภทเหตุ")
    private Long incidentTypeId;

    // รายละเอียดเพิ่มเติม (optional)
    private String description;

    @NotBlank(message = "กรุณากรอกเบอร์ติดต่อ")
    private String contactPhone;

    private MultipartFile[] files;

    @NotNull(message = "กรุณาระบุตำแหน่ง latitude")
    private BigDecimal latitude;

    @NotNull(message = "กรุณาระบุตำแหน่ง longitude")
    private BigDecimal longitude;
}
