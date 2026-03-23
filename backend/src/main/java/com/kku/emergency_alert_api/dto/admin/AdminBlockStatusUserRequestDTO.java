package com.kku.emergency_alert_api.dto.admin;

import com.kku.emergency_alert_api.constant.BlockActionEnum;
import com.kku.emergency_alert_api.constant.UserRoleEnum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminBlockStatusUserRequestDTO {
    @NotNull(message = "Target type is required (REPORTER or STAFF)")
    private UserRoleEnum targetType;

    @NotNull(message = "Action is required (BLOCK or UNBLOCK)")
    private BlockActionEnum action;

    @NotBlank(message = "Reason is required")
    private String reason;
}
