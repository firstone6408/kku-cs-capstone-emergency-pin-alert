package com.kku.emergency_alert_api.dto.auth;

import java.time.LocalDateTime;

import com.kku.emergency_alert_api.constant.StaffRoleEnum;
import com.kku.emergency_alert_api.constant.UserRoleEnum;
import com.kku.emergency_alert_api.models.UserPrincipal;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserPrincipalResponseDTO {
    // ข้อมูล user ที่จะส่งกลับ
    private final Long id;
    private final String email;
    private final String fullName;
    private final String phone;
    private final UserRoleEnum role; // "REPORTER" | "STAFF" | "ADMIN"
    private final StaffRoleEnum staffRole; // "VOLUNTEER" | "OFFICER"
    private final Boolean isBlocked;
    private final LocalDateTime createdAt;

    public static UserPrincipalResponseDTO fromEntity(UserPrincipal entity) {
        return UserPrincipalResponseDTO.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .fullName(entity.getFullName())
                .phone(entity.getPhone())
                .role(entity.getRole())
                .staffRole(entity.getStaffRole()) // optional
                .isBlocked(entity.getIsBlocked())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
