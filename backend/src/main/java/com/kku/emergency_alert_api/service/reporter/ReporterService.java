package com.kku.emergency_alert_api.service.reporter;

import java.util.List;

import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.dto.repoter.ReporterRequestDTO;

public interface ReporterService {
    List<UserPrincipalResponseDTO> getAll();

    UserPrincipalResponseDTO getById(Long id);

    UserPrincipalResponseDTO create(ReporterRequestDTO dto);

    UserPrincipalResponseDTO update(Long id, ReporterRequestDTO dto);

    void delete(Long id);
}
