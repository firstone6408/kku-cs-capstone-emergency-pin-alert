package com.kku.emergency_alert_api.dto.auth;

import java.time.LocalDateTime;

import com.kku.emergency_alert_api.constant.UserRoleEnum;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponseDTO {
    private final String token;

    // ข้อมูล user ที่จะส่งกลับ
    private final Long id;
    private final String email;
    private final String fullName;
    private final String phone;
    private final UserRoleEnum role; // "REPORTER" | "STAFF"
    private final Boolean isBlocked;
    private final LocalDateTime createdAt;
}
