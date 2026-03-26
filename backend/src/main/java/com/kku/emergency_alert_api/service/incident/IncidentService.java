package com.kku.emergency_alert_api.service.incident;

import java.util.List;

import com.kku.emergency_alert_api.dto.incident.IncidentRequestDTO;
import com.kku.emergency_alert_api.dto.incident.IncidentResponseDTO;

public interface IncidentService {
    // ดูรายละเอียดรายการแจ้งเหตุ
    IncidentResponseDTO getById(Long incidentId);

    // แจ้งเหตุใหม่ — รวม upload evidence
    IncidentResponseDTO create(Long reporterId, IncidentRequestDTO dto);

    // ดูรายการแจ้งเหตุของ reporter
    List<IncidentResponseDTO> getAllByReporter(Long reporterId);

    // ดูรายการแจ้งเหตุของ staff
    List<IncidentResponseDTO> getAll();

}
