package com.kku.emergency_alert_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kku.emergency_alert_api.entity.TeamMemberEntity;

public interface TeamMemberRepository extends JpaRepository<TeamMemberEntity, Long> {

    // ดึงทีมปัจจุบันของ staff (left_at IS NULL = ยังอยู่ในทีม)
    Optional<TeamMemberEntity> findByStaffIdAndLeftAtIsNull(Long staffId);

    // ดึงสมาชิกปัจจุบันในทีม (left_at IS NULL)
    List<TeamMemberEntity> findByTeamIdAndLeftAtIsNull(Long teamId);

    // เช็กว่า staff อยู่ในทีมนี้อยู่ไหม
    boolean existsByTeamIdAndStaffIdAndLeftAtIsNull(Long teamId, Long staffId);
}
