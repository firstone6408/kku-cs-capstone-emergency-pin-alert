package com.kku.emergency_alert_api.service.incident_type;

import java.util.List;

import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeActiveChangeRequestDTO;
import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeRequestDTO;
import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeResponseDTO;

public interface IncidentTypeService {

    List<IncidentTypeResponseDTO> getAll();

    IncidentTypeResponseDTO getById(Long id);

    IncidentTypeResponseDTO create(IncidentTypeRequestDTO dto);

    IncidentTypeResponseDTO update(Long id, IncidentTypeRequestDTO dto);

    void delete(Long id);

    void changeActiveStatus(Long id, IncidentTypeActiveChangeRequestDTO dto);
}
