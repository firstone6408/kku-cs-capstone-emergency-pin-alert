package com.kku.emergency_alert_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kku.emergency_alert_api.entity.IncidentTypeEntity;

public interface IncidentTypeRepository extends JpaRepository<IncidentTypeEntity, Long> {

    // ดึงประเภทเหตุที่ active เรียงตาม priority (1 = สำคัญสุด)
    // List<IncidentTypeEntity> findByIsActiveTrueOrderByPriorityLevelAsc();

    List<IncidentTypeEntity> findByOrderByPriorityLevelAsc();

    boolean existsByName(String name);
}
