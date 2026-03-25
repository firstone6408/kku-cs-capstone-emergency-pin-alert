package com.kku.emergency_alert_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
}
