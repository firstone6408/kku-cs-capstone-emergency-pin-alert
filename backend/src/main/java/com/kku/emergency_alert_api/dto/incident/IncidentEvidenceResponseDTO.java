package com.kku.emergency_alert_api.dto.incident;

import com.kku.emergency_alert_api.entity.IncidentEvidenceEntity;

import lombok.Builder;
import lombok.Getter;

// Response DTO สำหรับหลักฐานประกอบการแจ้งเหตุ
@Getter
@Builder
public class IncidentEvidenceResponseDTO {
    private final Long id;
    private final String fileType;
    private final String fileUrl;
    private final String fileName;
    private final Long fileSize;

    public static IncidentEvidenceResponseDTO fromEntity(IncidentEvidenceEntity entity) {
        return IncidentEvidenceResponseDTO.builder()
                .id(entity.getId())
                .fileType(entity.getFileType().name())
                .fileUrl(entity.getFileUrl())
                .fileName(entity.getFileName())
                .fileSize(entity.getFileSize())
                .build();
    }
}
