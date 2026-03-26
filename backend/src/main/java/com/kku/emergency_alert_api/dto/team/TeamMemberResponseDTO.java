package com.kku.emergency_alert_api.dto.team;

import java.time.LocalDateTime;

import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.entity.TeamMemberEntity;

import lombok.Builder;
import lombok.Getter;

// Response DTO สำหรับสมาชิกในทีม
@Getter
@Builder
public class TeamMemberResponseDTO {
    private final Long id;
    private final UserPrincipalResponseDTO staff;
    private final LocalDateTime joinedAt;
    private final LocalDateTime leftAt;

    public static TeamMemberResponseDTO fromEntity(TeamMemberEntity entity) {
        return TeamMemberResponseDTO.builder()
                .id(entity.getId())
                .staff(UserPrincipalResponseDTO.fromEntity(entity.getStaff()))
                .joinedAt(entity.getJoinedAt())
                .leftAt(entity.getLeftAt())
                .build();
    }
}
