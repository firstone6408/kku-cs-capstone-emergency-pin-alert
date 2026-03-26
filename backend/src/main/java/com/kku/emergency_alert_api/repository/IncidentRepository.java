package com.kku.emergency_alert_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.kku.emergency_alert_api.constant.IncidentStatusEnum;
import com.kku.emergency_alert_api.entity.IncidentEntity;

@Repository
public interface IncidentRepository extends JpaRepository<IncidentEntity, Long> {
    // ดึงรายการแจ้งเหตุทั้งหมดของ reporter เรียงจากใหม่สุด
    @Query("""
                SELECT i FROM IncidentEntity i
                WHERE i.reporter.id = :reporterId
                ORDER BY
                    CASE
                        WHEN i.status IN ('COMPLETED', 'CANCELLED') THEN 1
                        ELSE 0
                    END,
                    i.createdAt DESC
            """)
    List<IncidentEntity> findByReporterIdOrderByStatusAndCreatedAtDesc(Long reporterId);

    List<IncidentEntity> findAllByOrderByStatusAscCreatedAtDesc();

    @Query("SELECT MAX(i.id) FROM IncidentEntity i")
    Long findMaxId();

    // ดึง incidents ตาม list ของ status เรียงตาม priority (สำคัญสุดก่อน)
    // แล้วตามเวลาสร้าง (ใหม่สุดก่อน)
    List<IncidentEntity> findByStatusInOrderByIncidentType_PriorityLevelAscCreatedAtDesc(
            List<IncidentStatusEnum> statuses);

    // ดึง incidents ตาม status เดียว เรียงตาม priority
    List<IncidentEntity> findByStatusOrderByIncidentType_PriorityLevelAscCreatedAtDesc(IncidentStatusEnum status);
}
