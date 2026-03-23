package com.kku.emergency_alert_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kku.emergency_alert_api.entity.BlockHistoryEntity;

public interface BlockHistoryRepository extends JpaRepository<BlockHistoryEntity, Long> {

}
