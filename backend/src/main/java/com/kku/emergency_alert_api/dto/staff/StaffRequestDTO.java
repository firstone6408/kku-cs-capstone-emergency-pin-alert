package com.kku.emergency_alert_api.dto.staff;

import com.kku.emergency_alert_api.constant.StaffRoleEnum;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StaffRequestDTO {
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotNull(message = "Staff Role is required (VOLUNTEER or OFFICER)")
    private StaffRoleEnum staffRole;

    private String password;
}
