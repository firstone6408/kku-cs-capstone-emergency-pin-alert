package com.kku.emergency_alert_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kku.emergency_alert_api.annotation.RequireRole;
import com.kku.emergency_alert_api.constant.IncidentStatusEnum;
import com.kku.emergency_alert_api.constant.UserRoleEnum;
import com.kku.emergency_alert_api.context.UserContextProvider;
import com.kku.emergency_alert_api.dto.incident.CompleteIncidentRequestDTO;
import com.kku.emergency_alert_api.dto.incident.IncidentForStaffResponseDTO;
import com.kku.emergency_alert_api.dto.incident.RequestMoreTeamsDTO;
import com.kku.emergency_alert_api.service.incident_assignment.IncidentAssignmentService;
import com.kku.emergency_alert_api.util.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/staffs/incidents")
public class IncidentAssignmentController {

    private final IncidentAssignmentService incidentAssignmentService;
    private final UserContextProvider userContextProvider;

    public IncidentAssignmentController(
            IncidentAssignmentService incidentAssignmentService,
            UserContextProvider userContextProvider) {
        this.incidentAssignmentService = incidentAssignmentService;
        this.userContextProvider = userContextProvider;
    }

    // ดึงรายการ incident ทั้งหมดสำหรับ staff (เรียงตาม priority)
    @GetMapping
    @RequireRole({ UserRoleEnum.STAFF })
    public ResponseEntity<ApiResponse<List<IncidentForStaffResponseDTO>>> getIncidents(
            @RequestParam(value = "status", required = false) IncidentStatusEnum status) {
        return ApiResponse.success(incidentAssignmentService.getIncidentsForStaff(status));
    }

    // ดึง active mission ของทีม staff
    @GetMapping("/my-mission")
    @RequireRole({ UserRoleEnum.STAFF })
    public ResponseEntity<ApiResponse<IncidentForStaffResponseDTO>> getMyMission() {
        Long staffId = userContextProvider.getCurrentUserId();
        return ApiResponse.success(incidentAssignmentService.getMyActiveMission(staffId));
    }

    // ดูรายละเอียด incident
    @GetMapping("/{id}")
    @RequireRole({ UserRoleEnum.STAFF })
    public ResponseEntity<ApiResponse<IncidentForStaffResponseDTO>> getDetail(@PathVariable Long id) {
        return ApiResponse.success(incidentAssignmentService.getIncidentDetailForStaff(id));
    }

    // ทีมกดรับงาน
    @PostMapping("/{id}/accept")
    @RequireRole({ UserRoleEnum.STAFF })
    public ResponseEntity<ApiResponse<IncidentForStaffResponseDTO>> accept(@PathVariable Long id) {
        Long staffId = userContextProvider.getCurrentUserId();
        return ApiResponse.success("Incident accepted",
                incidentAssignmentService.acceptIncident(staffId, id));
    }

    // ขอทีมเพิ่ม
    @PostMapping("/{id}/request-more-teams")
    @RequireRole({ UserRoleEnum.STAFF })
    public ResponseEntity<ApiResponse<IncidentForStaffResponseDTO>> requestMoreTeams(
            @PathVariable Long id,
            @Valid @RequestBody RequestMoreTeamsDTO dto) {
        Long staffId = userContextProvider.getCurrentUserId();
        return ApiResponse.success("Request for more teams submitted",
                incidentAssignmentService.requestMoreTeams(staffId, id, dto));
    }

    // ยืนยันช่วยเหลือสำเร็จ
    @PostMapping("/{id}/complete")
    @RequireRole({ UserRoleEnum.STAFF })
    public ResponseEntity<ApiResponse<IncidentForStaffResponseDTO>> complete(
            @PathVariable Long id,
            @RequestBody(required = false) CompleteIncidentRequestDTO dto) {
        Long staffId = userContextProvider.getCurrentUserId();
        IncidentForStaffResponseDTO response = incidentAssignmentService.completeIncident(staffId, id,
                dto != null ? dto : new CompleteIncidentRequestDTO());
        return ApiResponse.success("Incident completed successfully", response);
    }

    // ยกเลิกการช่วยเหลือ
    @PutMapping("/{id}/cancel-assignment")
    @RequireRole({ UserRoleEnum.STAFF })
    public ResponseEntity<ApiResponse<IncidentForStaffResponseDTO>> cancelAssignment(@PathVariable Long id) {
        Long staffId = userContextProvider.getCurrentUserId();

        return ApiResponse.success("Assignment cancelled", incidentAssignmentService.cancelAssignment(staffId, id));
    }
}
