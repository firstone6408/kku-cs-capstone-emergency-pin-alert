package com.kku.emergency_alert_api.service.staff;

import java.util.List;

import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.dto.staff.StaffRequestDTO;
import com.kku.emergency_alert_api.dto.team.TeamResponseDTO;
import com.kku.emergency_alert_api.exception.BusinessException;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;

public interface StaffService {
    List<UserPrincipalResponseDTO> getAll();

    UserPrincipalResponseDTO getById(Long id);

    UserPrincipalResponseDTO create(StaffRequestDTO dto);

    UserPrincipalResponseDTO update(Long id, StaffRequestDTO dto);

    void delete(Long id);

    /**
     * ดึงข้อมูลทีมปัจจุบันของ Staff พร้อมรายชื่อสมาชิกที่ยังอยู่ในทีม
     *
     * @param staffId ID ของ staff ที่ login อยู่
     * @return DTO ทีมพร้อมสมาชิก
     * @throws ResourceNotFoundException ถ้า staff ยังไม่มีทีม
     */
    TeamResponseDTO getMyTeam(Long staffId);

    /**
     * ดึงข้อมูลทีมทั้งหมดในระบบ พร้อมสมาชิกปัจจุบันของแต่ละทีม
     * ใช้แสดงในหน้าจัดการทีม (ดูทีมอื่น ๆ ได้)
     *
     * @return list ของทุกทีม
     */
    List<TeamResponseDTO> getAllTeams();

    // ==================== Team Management ====================

    /**
     * สร้างทีมใหม่ + เพิ่มตัวเองเป็นสมาชิกอัตโนมัติ
     * ถ้า staff อยู่ในทีมเดิม → ออกจากทีมเดิมก่อนแล้วสร้างทีมใหม่
     *
     * @param staffId  ID ของ staff ที่ login อยู่
     * @param teamName ชื่อทีมใหม่
     * @return DTO ทีมที่สร้าง + สมาชิก
     */
    TeamResponseDTO createTeam(Long staffId, String teamName);

    /**
     * เข้าร่วมทีมที่มีอยู่แล้ว
     * ถ้า staff อยู่ในทีมเดิม → out จากทีมเดิมก่อนแล้ว join ทีมใหม่
     *
     * @param staffId ID ของ staff ที่ login อยู่
     * @param teamId  ID ของทีมที่จะเข้าร่วม
     * @return DTO ทีมที่เข้าร่วม + สมาชิก
     * @throws ResourceNotFoundException ถ้าไม่พบทีม
     */
    TeamResponseDTO joinTeam(Long staffId, Long teamId);

    /**
     * ออกจากทีมปัจจุบัน (set left_at)
     *
     * @param staffId ID ของ staff ที่ login อยู่
     * @throws ResourceNotFoundException ถ้า staff ไม่มีทีม
     * @throws BusinessException         ถ้าทีมกำลัง ON_MISSION อยู่
     */
    void leaveTeam(Long staffId);

    /**
     * เตะสมาชิกออกจากทีม — ต้องอยู่ทีมเดียวกัน
     *
     * @param staffId  ID ของ staff ที่ login (คนเตะ)
     * @param memberId ID ของ team_member ที่จะเตะ
     * @return DTO ทีมหลังเตะสมาชิก
     * @throws ResourceNotFoundException ถ้าไม่พบ member
     * @throws BusinessException         ถ้าไม่ได้อยู่ทีมเดียวกัน หรือเตะตัวเอง
     */
    TeamResponseDTO kickMember(Long staffId, Long memberId);
}
