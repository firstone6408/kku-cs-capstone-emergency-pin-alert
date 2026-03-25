package com.kku.emergency_alert_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kku.emergency_alert_api.entity.IncidentEvidenceEntity;

@Repository
public interface IncidentEvidenceRepository extends JpaRepository<IncidentEvidenceEntity, Long> {

}
