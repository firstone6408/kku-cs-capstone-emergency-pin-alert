package com.kku.emergency_alert_api.dto.team;

import java.time.LocalDateTime;
import java.util.List;

import com.kku.emergency_alert_api.constant.TeamStatusEnum;
import com.kku.emergency_alert_api.entity.TeamEntity;
import com.kku.emergency_alert_api.entity.TeamMemberEntity;

import lombok.Builder;
import lombok.Getter;

// Response DTO สำหรับทีม (รวมสมาชิกปัจจุบัน)
@Getter
@Builder
public class TeamResponseDTO {
    private final Long id;
    private final String name;
    private final TeamStatusEnum status;
    private final List<TeamMemberResponseDTO> members;
    private final LocalDateTime createdAt;

    /**
     * แปลง Entity → DTO พร้อมกรองเฉพาะสมาชิกปัจจุบัน (left_at IS NULL)
     */
    public static TeamResponseDTO fromEntity(TeamEntity entity) {
        List<TeamMemberResponseDTO> activeMembers = entity.getMembers().stream()
                .filter(m -> m.getLeftAt() == null) // เฉพาะสมาชิกที่ยังอยู่
                .map(TeamMemberResponseDTO::fromEntity)
                .toList();

        return TeamResponseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .status(entity.getStatus())
                .members(activeMembers)
                .createdAt(entity.getCreatedAt())
                .build();
    }

    /**
     * แปลง Entity → DTO โดยรับ list สมาชิกที่ query มาแล้ว (ประหยัดการ filter)
     */
    public static TeamResponseDTO fromEntity(TeamEntity entity, List<TeamMemberEntity> activeMembers) {
        return TeamResponseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .status(entity.getStatus())
                .members(activeMembers.stream()
                        .map(TeamMemberResponseDTO::fromEntity)
                        .toList())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
