package com.kku.emergency_alert_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kku.emergency_alert_api.constant.TeamStatusEnum;
import com.kku.emergency_alert_api.entity.TeamEntity;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {

    // ดึงทีมตามสถานะ (AVAILABLE / ON_MISSION)
    List<TeamEntity> findByStatus(TeamStatusEnum status);
}
