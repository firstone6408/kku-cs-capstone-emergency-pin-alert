package com.kku.emergency_alert_api.models;

import java.time.LocalDateTime;

import com.kku.emergency_alert_api.constant.StaffRoleEnum;
import com.kku.emergency_alert_api.constant.UserRoleEnum;

public interface UserPrincipal {
    Long getId();

    String getEmail();

    String getFullName();

    String getPhone();

    UserRoleEnum getRole();

    Boolean getIsBlocked();

    LocalDateTime getCreatedAt();

    StaffRoleEnum getStaffRole();
}
