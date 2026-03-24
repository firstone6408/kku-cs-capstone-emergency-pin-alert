package com.kku.emergency_alert_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kku.emergency_alert_api.annotation.RequireRole;
import com.kku.emergency_alert_api.constant.UserRoleEnum;
import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeActiveChangeRequestDTO;
import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeRequestDTO;
import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeResponseDTO;
import com.kku.emergency_alert_api.service.incident_type.IncidentTypeService;
import com.kku.emergency_alert_api.util.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/incident-types")
public class IncidentTypeController {
    private final IncidentTypeService incidentTypeService;

    public IncidentTypeController(IncidentTypeService incidentTypeService) {
        this.incidentTypeService = incidentTypeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<IncidentTypeResponseDTO>>> getAll() {
        return ApiResponse.success(incidentTypeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IncidentTypeResponseDTO>> getById(Long id) {
        return ApiResponse.success(incidentTypeService.getById(id));
    }

    @PostMapping
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<IncidentTypeResponseDTO>> create(
            @Valid @RequestBody IncidentTypeRequestDTO requestDTO) {
        return ApiResponse.success(incidentTypeService.create(requestDTO));
    }

    @PutMapping("/{id}")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<IncidentTypeResponseDTO>> update(@PathVariable Long id,
            @Valid @RequestBody IncidentTypeRequestDTO requestDTO) {
        return ApiResponse.success(incidentTypeService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable Long id) {
        incidentTypeService.delete(id);
        return ApiResponse.success("Incident type deleted success");
    }

    @PatchMapping("/{id}/active-status")
    @RequireRole({ UserRoleEnum.ADMIN })
    public ResponseEntity<ApiResponse<Object>> changeActiveStatus(@PathVariable Long id,
            @RequestBody IncidentTypeActiveChangeRequestDTO requestDTO) {
        incidentTypeService.changeActiveStatus(id, requestDTO);
        return ApiResponse.success("Incident type active status changed success");
    }
}
