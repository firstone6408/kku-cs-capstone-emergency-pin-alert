package com.kku.emergency_alert_api.service.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.kku.emergency_alert_api.dto.admin.AdminRequestDTO;
import com.kku.emergency_alert_api.dto.admin.AdminResponseDTO;
import com.kku.emergency_alert_api.entity.AdminEntity;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;
import com.kku.emergency_alert_api.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminServiceImpl(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminResponseDTO> getAll() {
        List<AdminEntity> admins = adminRepository.findAll();
        return admins.stream().map(AdminResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AdminResponseDTO getById(Long id) {
        AdminEntity admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
        return AdminResponseDTO.fromEntity(admin);
    }

    @Override
    @Transactional
    public AdminResponseDTO create(AdminRequestDTO requestDTO) {
        if (adminRepository.existsByEmail(requestDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(requestDTO.getPassword());

        AdminEntity adminToCreate = new AdminEntity();
        adminToCreate.setEmail(requestDTO.getEmail());
        adminToCreate.setFullName(requestDTO.getFullName());
        adminToCreate.setPasswordHash(encodedPassword);

        AdminEntity created = adminRepository.save(adminToCreate);
        return AdminResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public AdminResponseDTO update(Long id, AdminRequestDTO requestDTO) {
        AdminEntity adminToUpdate = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));

        // เช็คว่า email ไม่ซ้ำกับคนอื่น
        if (!adminToUpdate.getEmail().equals(requestDTO.getEmail())
                && adminRepository.existsByEmail(requestDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        adminToUpdate.setEmail(requestDTO.getEmail());
        adminToUpdate.setFullName(requestDTO.getFullName());

        // เปลี่ยนรหัสผ่าน
        if (requestDTO.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(requestDTO.getPassword());
            adminToUpdate.setPasswordHash(encodedPassword);
        }

        AdminEntity updated = adminRepository.save(adminToUpdate);
        return AdminResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AdminEntity adminToDelete = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));

        adminRepository.delete(adminToDelete);
    }

}
