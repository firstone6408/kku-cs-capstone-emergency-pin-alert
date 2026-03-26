package com.kku.emergency_alert_api.service.incident;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kku.emergency_alert_api.constant.IncidentStatusEnum;
import com.kku.emergency_alert_api.dto.incident.IncidentRequestDTO;
import com.kku.emergency_alert_api.dto.incident.IncidentResponseDTO;
import com.kku.emergency_alert_api.entity.IncidentEntity;
import com.kku.emergency_alert_api.entity.IncidentEvidenceEntity;
import com.kku.emergency_alert_api.entity.IncidentTypeEntity;
import com.kku.emergency_alert_api.entity.ReporterEntity;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;
import com.kku.emergency_alert_api.repository.IncidentEvidenceRepository;
import com.kku.emergency_alert_api.repository.IncidentRepository;
import com.kku.emergency_alert_api.repository.IncidentTypeRepository;
import com.kku.emergency_alert_api.repository.ReporterRepository;
import com.kku.emergency_alert_api.util.ImageKitFileHandler;

@Service
public class IncidentServiceImpl implements IncidentService {
    private final IncidentRepository incidentRepository;
    private final IncidentTypeRepository incidentTypeRepository;
    private final IncidentEvidenceRepository incidentEvidenceRepository;
    private final ReporterRepository reporterRepository;
    private final ImageKitFileHandler imageKitFileHandler;

    public IncidentServiceImpl(IncidentRepository incidentRepository, IncidentTypeRepository incidentTypeRepository,
            IncidentEvidenceRepository incidentEvidenceRepository, ReporterRepository reporterRepository,
            ImageKitFileHandler imageKitFileHandler) {
        this.incidentRepository = incidentRepository;
        this.incidentTypeRepository = incidentTypeRepository;
        this.incidentEvidenceRepository = incidentEvidenceRepository;
        this.reporterRepository = reporterRepository;
        this.imageKitFileHandler = imageKitFileHandler;
    }

    @Override
    @Transactional(readOnly = true)
    public IncidentResponseDTO getById(Long incidentId) {
        IncidentEntity incident = incidentRepository.findById(incidentId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident not found with id: " + incidentId));
        return IncidentResponseDTO.fromEntity(incident);
    }

    @Override
    @Transactional(readOnly = true)
    public List<IncidentResponseDTO> getAllByReporter(Long reporterId) {
        List<IncidentEntity> incidents = incidentRepository.findByReporterIdOrderByStatusAndCreatedAtDesc(reporterId);
        return incidents.stream().map(IncidentResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<IncidentResponseDTO> getAll() {
        List<IncidentEntity> incidents = incidentRepository.findAllByOrderByStatusAscCreatedAtDesc();
        return incidents.stream().map(IncidentResponseDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public IncidentResponseDTO create(Long reporterId, IncidentRequestDTO dto) {
        // หา reporter
        ReporterEntity reporter = reporterRepository.findById(reporterId)
                .orElseThrow(() -> new ResourceNotFoundException("Reporter not found"));

        // หาประเภทเหตุ
        IncidentTypeEntity incidentType = incidentTypeRepository.findById(dto.getIncidentTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Incident type not found"));

        // สร้าง incident
        IncidentEntity incidentToCreate = new IncidentEntity();
        incidentToCreate.setReporter(reporter);
        incidentToCreate.setIncidentType(incidentType);
        incidentToCreate.setDescription(dto.getDescription());
        incidentToCreate.setContactPhone(dto.getContactPhone());
        incidentToCreate.setAddress(dto.getAddress());
        incidentToCreate.setLatitude(dto.getLatitude());
        incidentToCreate.setLongitude(dto.getLongitude());
        incidentToCreate.setStatus(IncidentStatusEnum.REPORTED);

        IncidentEntity savedIncident = incidentRepository.save(incidentToCreate);

        // upload evidence files (ถ้ามี)
        List<IncidentEvidenceEntity> evidenceList = new ArrayList<>();
        MultipartFile[] files = dto.getFiles();

        if (files != null) {
            for (MultipartFile file : files) {
                if (file != null && !file.isEmpty()) {
                    ImageKitFileHandler.UploadResult uploadResult = imageKitFileHandler.uploadFile(file,
                            "incidents/evidence");

                    IncidentEvidenceEntity evidenceToCreate = new IncidentEvidenceEntity();
                    evidenceToCreate.setIncident(savedIncident);
                    evidenceToCreate.setFileType(uploadResult.fileType());
                    evidenceToCreate.setImagekitFileId(uploadResult.fileId());
                    evidenceToCreate.setFileUrl(uploadResult.fileUrl());
                    evidenceToCreate.setFileName(uploadResult.fileName());
                    evidenceToCreate.setFileSize(uploadResult.fileSize());

                    evidenceList.add(incidentEvidenceRepository.save(evidenceToCreate));
                }
            }
        }

        savedIncident.setEvidence(evidenceList);
        return IncidentResponseDTO.fromEntity(savedIncident);
    }

}
