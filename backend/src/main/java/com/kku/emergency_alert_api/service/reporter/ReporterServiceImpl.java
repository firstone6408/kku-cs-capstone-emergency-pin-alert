package com.kku.emergency_alert_api.service.reporter;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.dto.repoter.ReporterRequestDTO;
import com.kku.emergency_alert_api.entity.ReporterEntity;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;
import com.kku.emergency_alert_api.repository.ReporterRepository;

@Service
public class ReporterServiceImpl implements ReporterService {
    private final ReporterRepository reporterRepository;
    private final PasswordEncoder passwordEncoder;

    public ReporterServiceImpl(ReporterRepository reporterRepository, PasswordEncoder passwordEncoder) {
        this.reporterRepository = reporterRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserPrincipalResponseDTO> getAll() {
        List<ReporterEntity> reporters = reporterRepository.findAll();
        return reporters.stream().map(UserPrincipalResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserPrincipalResponseDTO getById(Long id) {
        ReporterEntity reporter = reporterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reporter not found with id: " + id));
        return UserPrincipalResponseDTO.fromEntity(reporter);
    }

    @Override
    @Transactional
    public UserPrincipalResponseDTO create(ReporterRequestDTO dto) {
        if (reporterRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceNotFoundException("Email already exists");
        }

        ReporterEntity reporterToCreate = new ReporterEntity();
        reporterToCreate.setEmail(dto.getEmail());
        reporterToCreate.setFullName(dto.getFullName());
        reporterToCreate.setPhone(dto.getPhone());

        if (dto.getPassword() == null) {
            throw new ResourceNotFoundException("Password is required");
        }
        reporterToCreate.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        reporterToCreate.setIsBlocked(false);

        ReporterEntity created = reporterRepository.save(reporterToCreate);
        return UserPrincipalResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public UserPrincipalResponseDTO update(Long id, ReporterRequestDTO dto) {
        if (!reporterRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reporter not found with id: " + id);
        }

        ReporterEntity reporterToUpdate = reporterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reporter not found with id: " + id));

        if (!reporterToUpdate.getEmail().equals(dto.getEmail())
                && reporterRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceNotFoundException("Email already exists");
        }

        reporterToUpdate.setEmail(dto.getEmail());
        reporterToUpdate.setFullName(dto.getFullName());
        reporterToUpdate.setPhone(dto.getPhone());
        if (dto.getPassword() != null) {
            reporterToUpdate.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        ReporterEntity updated = reporterRepository.save(reporterToUpdate);
        return UserPrincipalResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ReporterEntity reporterToDelete = reporterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reporter not found with id: " + id));

        reporterRepository.delete(reporterToDelete);
    }

}
