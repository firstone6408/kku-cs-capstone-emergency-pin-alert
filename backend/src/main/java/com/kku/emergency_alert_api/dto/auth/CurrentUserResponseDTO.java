package com.kku.emergency_alert_api.dto.auth;

import java.time.LocalDateTime;

import com.kku.emergency_alert_api.constant.UserRoleEnum;
import com.kku.emergency_alert_api.models.UserPrincipal;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CurrentUserResponseDTO {
    // ข้อมูล user ที่จะส่งกลับ
    private final Long id;
    private final String email;
    private final String fullName;
    private final String phone;
    private final UserRoleEnum role; // "REPORTER" | "STAFF" | "ADMIN"
    private final Boolean isBlocked;
    private final LocalDateTime createdAt;

    public static CurrentUserResponseDTO fromEntity(UserPrincipal entity) {
        return CurrentUserResponseDTO.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .fullName(entity.getFullName())
                .phone(entity.getPhone())
                .role(entity.getRole())
                .isBlocked(entity.getIsBlocked())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
