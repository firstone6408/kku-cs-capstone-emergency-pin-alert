package com.kku.emergency_alert_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kku.emergency_alert_api.constant.AssignmentStatusEnum;
import com.kku.emergency_alert_api.entity.IncidentAssignmentEntity;

public interface IncidentAssignmentRepository extends JpaRepository<IncidentAssignmentEntity, Long> {

    // ดึง assignment ทั้งหมดของ incident (รวมทุกสถานะ)
    List<IncidentAssignmentEntity> findByIncidentId(Long incidentId);

    // ดึง active assignment ของทีม (เช่น ACCEPTED)
    List<IncidentAssignmentEntity> findByTeamIdAndStatus(Long teamId, AssignmentStatusEnum status);

    // นับจำนวนทีมที่รับงาน incident นี้ (นับเฉพาะ status ที่ระบุ)
    long countByIncidentIdAndStatus(Long incidentId, AssignmentStatusEnum status);

    // เช็กว่าทีมเคยรับงาน incident นี้แล้วหรือยัง (กัน duplicate)
    boolean existsByIncidentIdAndTeamIdAndStatus(Long incidentId, Long teamId, AssignmentStatusEnum status);

    // ดึง assignment ของทีมใน incident นี้ (ค้นหาเฉพาะ ACCEPTED)
    Optional<IncidentAssignmentEntity> findByIncidentIdAndTeamIdAndStatus(Long incidentId, Long teamId,
            AssignmentStatusEnum status);
}
