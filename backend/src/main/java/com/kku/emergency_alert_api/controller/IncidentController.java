package com.kku.emergency_alert_api.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kku.emergency_alert_api.annotation.RequireRole;
import com.kku.emergency_alert_api.constant.UserRoleEnum;
import com.kku.emergency_alert_api.context.UserContextProvider;
import com.kku.emergency_alert_api.dto.incident.IncidentRequestDTO;
import com.kku.emergency_alert_api.dto.incident.IncidentResponseDTO;
import com.kku.emergency_alert_api.service.incident.IncidentService;
import com.kku.emergency_alert_api.util.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {
    private final IncidentService incidentService;
    private final UserContextProvider userContextProvider;

    public IncidentController(IncidentService incidentService, UserContextProvider userContextProvider) {
        this.incidentService = incidentService;
        this.userContextProvider = userContextProvider;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IncidentResponseDTO>> getById(@PathVariable Long id) {
        return ApiResponse.success(incidentService.getById(id));
    }

    @GetMapping("/reporter")
    @RequireRole({ UserRoleEnum.REPORTER })
    public ResponseEntity<ApiResponse<List<IncidentResponseDTO>>> getAllByReporter() {
        return ApiResponse.success(incidentService.getAllByReporter(userContextProvider.getCurrentUserId()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<IncidentResponseDTO>>> getAll() {
        return ApiResponse.success(incidentService.getAll());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @RequireRole({ UserRoleEnum.REPORTER })
    public ResponseEntity<ApiResponse<IncidentResponseDTO>> createReportIncident(
            @Valid @RequestBody @ModelAttribute IncidentRequestDTO requestDTO) {
        return ApiResponse.success(incidentService.create(userContextProvider.getCurrentUserId(), requestDTO));
    }
}
