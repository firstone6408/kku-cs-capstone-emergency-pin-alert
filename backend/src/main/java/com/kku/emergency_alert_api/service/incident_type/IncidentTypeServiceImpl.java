package com.kku.emergency_alert_api.service.incident_type;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeActiveChangeRequestDTO;
import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeRequestDTO;
import com.kku.emergency_alert_api.dto.incident_type.IncidentTypeResponseDTO;
import com.kku.emergency_alert_api.entity.IncidentTypeEntity;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;
import com.kku.emergency_alert_api.repository.IncidentTypeRepository;

@Service
public class IncidentTypeServiceImpl implements IncidentTypeService {
    private final IncidentTypeRepository incidentTypeRepository;

    public IncidentTypeServiceImpl(IncidentTypeRepository incidentTypeRepository) {
        this.incidentTypeRepository = incidentTypeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<IncidentTypeResponseDTO> getAll() {
        List<IncidentTypeEntity> incidentTypes = incidentTypeRepository.findByOrderByPriorityLevelAsc();
        return incidentTypes.stream().map(IncidentTypeResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public IncidentTypeResponseDTO getById(Long id) {
        IncidentTypeEntity incidentType = incidentTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("IncidentType not found with id: " + id));
        return IncidentTypeResponseDTO.fromEntity(incidentType);
    }

    @Override
    @Transactional
    public IncidentTypeResponseDTO create(IncidentTypeRequestDTO dto) {
        if (incidentTypeRepository.existsByName(dto.getName())) {
            throw new ResourceNotFoundException("IncidentType name already exists");
        }
        IncidentTypeEntity incidentTypeToCreate = new IncidentTypeEntity();
        incidentTypeToCreate.setName(dto.getName());
        incidentTypeToCreate.setPriorityLevel(dto.getPriorityLevel());

        // Set isActive to true
        incidentTypeToCreate.setIsActive(true);

        IncidentTypeEntity created = incidentTypeRepository.save(incidentTypeToCreate);
        return IncidentTypeResponseDTO.fromEntity(created);
    }

    @Override
    @Transactional
    public IncidentTypeResponseDTO update(Long id, IncidentTypeRequestDTO dto) {
        if (!incidentTypeRepository.existsById(id)) {
            throw new ResourceNotFoundException("IncidentType not found with id: " + id);
        }

        IncidentTypeEntity incidentTypeToUpdate = incidentTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("IncidentType not found with id: " + id));

        if (!incidentTypeToUpdate.getName().equals(dto.getName())
                && incidentTypeRepository.existsByName(dto.getName())) {
            throw new ResourceNotFoundException("IncidentType name already exists");
        }

        incidentTypeToUpdate.setName(dto.getName());
        incidentTypeToUpdate.setPriorityLevel(dto.getPriorityLevel());

        IncidentTypeEntity updated = incidentTypeRepository.save(incidentTypeToUpdate);
        return IncidentTypeResponseDTO.fromEntity(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        IncidentTypeEntity incidentTypeToDelete = incidentTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("IncidentType not found with id: " + id));
        incidentTypeRepository.delete(incidentTypeToDelete);
    }

    @Override
    @Transactional
    public void changeActiveStatus(Long id, IncidentTypeActiveChangeRequestDTO dto) {
        IncidentTypeEntity incidentTypeToUpdate = incidentTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("IncidentType not found with id: " + id));

        incidentTypeToUpdate.setIsActive(dto.getIsActive());
        incidentTypeRepository.save(incidentTypeToUpdate);
    }

}
