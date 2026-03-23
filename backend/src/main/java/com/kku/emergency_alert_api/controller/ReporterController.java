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
import com.kku.emergency_alert_api.dto.repoter.ReporterRequestDTO;
import com.kku.emergency_alert_api.service.reporter.ReporterService;
import com.kku.emergency_alert_api.util.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reporters")
public class ReporterController {
    private final ReporterService reporterService;

    public ReporterController(ReporterService reporterService) {
        this.reporterService = reporterService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserPrincipalResponseDTO>>> getReporterList() {
        return ApiResponse.success(reporterService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserPrincipalResponseDTO>> getReporterById(@PathVariable Long id) {
        return ApiResponse.success(reporterService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserPrincipalResponseDTO>> createReporter(
            @Valid @RequestBody ReporterRequestDTO requestDTO) {
        return ApiResponse.success(reporterService.create(requestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserPrincipalResponseDTO>> updateReporter(
            @PathVariable Long id,
            @Valid @RequestBody ReporterRequestDTO requestDTO) {
        return ApiResponse.success(reporterService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<Object>> deleteReporter(@PathVariable Long id) {
        reporterService.delete(id);
        return ApiResponse.success("Reporter deleted success");
    }

}
