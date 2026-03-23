package com.kku.emergency_alert_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kku.emergency_alert_api.annotation.RequireRole;
import com.kku.emergency_alert_api.constant.UserRoleEnum;
import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.dto.staff.StaffRequestDTO;
import com.kku.emergency_alert_api.service.staff.StaffService;
import com.kku.emergency_alert_api.util.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/staffs")
public class StaffController {
    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserPrincipalResponseDTO>>> getAll() {
        return ApiResponse.success(staffService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserPrincipalResponseDTO>> getById(@PathVariable Long id) {
        return ApiResponse.success(staffService.getById(id));
    }

    @PostMapping
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<UserPrincipalResponseDTO>> create(
            @Valid @RequestBody StaffRequestDTO requestDTO) {
        return ApiResponse.success(staffService.create(requestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserPrincipalResponseDTO>> update(
            @PathVariable Long id,
            @Valid @RequestBody StaffRequestDTO requestDTO) {
        return ApiResponse.success(staffService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable Long id) {
        staffService.delete(id);
        return ApiResponse.success("Staff deleted success");
    }

}
