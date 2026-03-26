package com.kku.emergency_alert_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kku.emergency_alert_api.entity.IncidentAssignmentMemberEntity;

public interface IncidentAssignmentMemberRepository extends JpaRepository<IncidentAssignmentMemberEntity, Long> {

    // นับจำนวนภารกิจทั้งหมดที่ staff เคยเข้าร่วม (snapshot)
    long countByStaffId(Long staffId);

    // นับจำนวนภารกิจที่ staff เคยเข้าร่วมและเสร็จสิ้นแล้ว
    long countByStaffIdAndAssignment_Status(Long staffId,
            com.kku.emergency_alert_api.constant.AssignmentStatusEnum status);
}
