package com.kku.emergency_alert_api.service.staff;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.dto.staff.StaffRequestDTO;
import com.kku.emergency_alert_api.entity.StaffEntity;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;
import com.kku.emergency_alert_api.repository.StaffRepository;

@Service
public class StaffSerivceImpl implements StaffService {
    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;

    public StaffSerivceImpl(StaffRepository staffRepository, PasswordEncoder passwordEncoder) {
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserPrincipalResponseDTO> getAll() {
        List<StaffEntity> staffs = staffRepository.findAll();
        return staffs.stream().map(UserPrincipalResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserPrincipalResponseDTO getById(Long id) {
        StaffEntity staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));
        return UserPrincipalResponseDTO.fromEntity(staff);
    }

    @Override
    @Transactional
    public UserPrincipalResponseDTO create(StaffRequestDTO dto) {
        if (staffRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceNotFoundException("Email already exists");
        }

        StaffEntity staffToCreate = new StaffEntity();
        staffToCreate.setEmail(dto.getEmail());
        staffToCreate.setFullName(dto.getFullName());
        staffToCreate.setPhone(dto.getPhone());
        staffToCreate.setStaffRole(dto.getStaffRole());

        if (dto.getPassword() == null) {
            throw new ResourceNotFoundException("Password is required");
        }
        staffToCreate.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        staffToCreate.setIsBlocked(false);

        StaffEntity created = staffRepository.save(staffToCreate);
        return UserPrincipalResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public UserPrincipalResponseDTO update(Long id, StaffRequestDTO dto) {
        if (!staffRepository.existsById(id)) {
            throw new ResourceNotFoundException("Staff not found with id: " + id);
        }

        StaffEntity staffToUpdate = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        if (!staffToUpdate.getEmail().equals(dto.getEmail())
                && staffRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceNotFoundException("Email already exists");
        }

        staffToUpdate.setEmail(dto.getEmail());
        staffToUpdate.setFullName(dto.getFullName());
        staffToUpdate.setPhone(dto.getPhone());
        staffToUpdate.setStaffRole(dto.getStaffRole());
        if (dto.getPassword() != null) {
            staffToUpdate.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        StaffEntity updated = staffRepository.save(staffToUpdate);
        return UserPrincipalResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StaffEntity staffToDelete = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));
        staffRepository.delete(staffToDelete);
    }

}
