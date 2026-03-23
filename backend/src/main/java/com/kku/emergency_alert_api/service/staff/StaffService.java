package com.kku.emergency_alert_api.service.staff;

import java.util.List;

import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.dto.staff.StaffRequestDTO;

public interface StaffService {
    List<UserPrincipalResponseDTO> getAll();

    UserPrincipalResponseDTO getById(Long id);

    UserPrincipalResponseDTO create(StaffRequestDTO dto);

    UserPrincipalResponseDTO update(Long id, StaffRequestDTO dto);

    void delete(Long id);
}
