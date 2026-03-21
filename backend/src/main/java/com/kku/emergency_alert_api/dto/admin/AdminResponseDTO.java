package com.kku.emergency_alert_api.dto.admin;

import java.time.LocalDateTime;

import com.kku.emergency_alert_api.entity.AdminEntity;

import lombok.Builder;
import lombok.Getter;

// Response DTO — ไม่เปิดเผย password_hash
@Getter
@Builder
public class AdminResponseDTO {

    private final Long id;
    private final String email;
    private final String fullName;
    private final LocalDateTime createdAt;

    // แปลง Entity → DTO (ไม่ส่ง password กลับไป client)
    public static AdminResponseDTO fromEntity(AdminEntity entity) {
        return AdminResponseDTO.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .fullName(entity.getFullName())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
