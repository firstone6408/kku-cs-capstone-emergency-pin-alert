package com.kku.emergency_alert_api.service.incident_assignment;

import java.util.List;

import com.kku.emergency_alert_api.constant.IncidentStatusEnum;
import com.kku.emergency_alert_api.dto.incident.CompleteIncidentRequestDTO;
import com.kku.emergency_alert_api.dto.incident.IncidentForStaffResponseDTO;
import com.kku.emergency_alert_api.dto.incident.RequestMoreTeamsDTO;
import com.kku.emergency_alert_api.exception.BusinessException;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;

/**
 * Service สำหรับจัดการการมอบหมายทีม ↔ รายการแจ้งเหตุ
 *
 * ครอบคลุม Business Flow หลัก:
 * - ดูรายการแจ้งเหตุที่ staff สามารถรับได้
 * - รับงาน (accept) → สร้าง assignment + snapshot สมาชิก
 * - ขอทีมเพิ่ม (request more teams) → เพิ่ม maxTeams
 * - ทำเสร็จ (complete) → เปลี่ยนสถานะ
 * - ยกเลิกการช่วย (cancel)
 */
public interface IncidentAssignmentService {

    /**
     * ดึงรายการ incident ทั้งหมดที่ staff สามารถมองเห็นได้
     * สถานะที่แสดง: REPORTED, IN_PROGRESS, NEED_MORE_TEAMS
     * เรียงลำดับตาม priority ของประเภทเหตุ (สำคัญสุดก่อน) แล้วตามเวลาสร้าง
     * (ใหม่สุดก่อน)
     *
     * @param status (optional) กรอง incidents ตามสถานะเฉพาะ, null = แสดงทั้งหมด
     * @return list ของ incident ย่อสำหรับ staff พร้อมจำนวนทีมที่รับงานแล้ว
     */
    List<IncidentForStaffResponseDTO> getIncidentsForStaff(IncidentStatusEnum status);

    /**
     * ดึงรายละเอียด incident ฉบับเต็มสำหรับ staff
     * รวม: ข้อมูลผู้แจ้งเหตุ, หลักฐาน (evidence), ทีมที่ assign ทั้งหมด
     *
     * @param incidentId ID ของ incident
     * @return DTO รายละเอียด incident
     * @throws ResourceNotFoundException ถ้าไม่พบ incident
     */
    IncidentForStaffResponseDTO getIncidentDetailForStaff(Long incidentId);

    /**
     * ทีมของ staff กดรับงาน (accept) rายการแจ้งเหตุ
     *
     * Business Rules:
     * 1. staff ต้องมีทีม (อยู่ใน team_members ที่ left_at IS NULL)
     * 2. ทีมต้องมีสถานะ AVAILABLE (ไม่ ON_MISSION)
     * 3. incident status ต้องเป็น REPORTED หรือ NEED_MORE_TEAMS
     * 4. จำนวนทีมที่รับแล้วต้อง < max_teams
     * 5. ทีมยังไม่เคยรับ incident นี้ (ไม่มี active assignment)
     *
     * Side Effects:
     * - สร้าง IncidentAssignment (status = ACCEPTED)
     * - Snapshot สมาชิกทีมปัจจุบัน → IncidentAssignmentMembers
     * - Team status → ON_MISSION
     * - Incident status → IN_PROGRESS
     *
     * @param staffId    ID ของ staff ที่กดรับงาน
     * @param incidentId ID ของ incident ที่จะรับ
     * @return DTO รายละเอียด incident หลังจาก accept แล้ว
     * @throws ResourceNotFoundException ถ้าไม่พบ staff, ทีม, หรือ incident
     * @throws BusinessException         ถ้าไม่ตรงตาม business rules
     */
    IncidentForStaffResponseDTO acceptIncident(Long staffId, Long incidentId);

    /**
     * ทีมของ staff ขอทีมเพิ่ม เพราะกำลังคนไม่พอ
     *
     * Business Rules:
     * 1. staff ต้องมี active assignment (ACCEPTED) ใน incident นี้
     * 2. incident status ต้องเป็น IN_PROGRESS หรือ NEED_MORE_TEAMS
     *
     * Side Effects:
     * - เพิ่ม incident.maxTeams ตามจำนวนที่ขอ
     * - Incident status → NEED_MORE_TEAMS
     *
     * @param staffId    ID ของ staff ที่ขอทีมเพิ่ม
     * @param incidentId ID ของ incident
     * @param dto        จำนวนทีมที่ต้องการเพิ่ม + เหตุผล (optional)
     * @return DTO รายละเอียด incident หลังจากเพิ่ม maxTeams แล้ว
     * @throws ResourceNotFoundException ถ้าไม่พบ staff, ทีม, หรือ incident
     * @throws BusinessException         ถ้าไม่มี active assignment หรือ incident
     *                                   status ไม่ถูกต้อง
     */
    IncidentForStaffResponseDTO requestMoreTeams(Long staffId, Long incidentId, RequestMoreTeamsDTO dto);

    /**
     * ทีมของ staff ยืนยันช่วยเหลือสำเร็จ
     *
     * Business Rules:
     * 1. staff ต้องมี active assignment (ACCEPTED) ใน incident นี้
     *
     * Side Effects:
     * - Assignment status → COMPLETED + set completedAt
     * - Team status → AVAILABLE
     * - ถ้าทุก assignment ของ incident เป็น COMPLETED → Incident status → COMPLETED
     *
     * @param staffId    ID ของ staff ที่กดเสร็จ
     * @param incidentId ID ของ incident
     * @param dto        หมายเหตุ (optional)
     * @throws ResourceNotFoundException ถ้าไม่พบ assignment
     * @throws BusinessException         ถ้า assignment status ไม่ใช่ ACCEPTED
     */
    IncidentForStaffResponseDTO completeIncident(Long staffId, Long incidentId, CompleteIncidentRequestDTO dto);

    /**
     * ทีมของ staff ยกเลิกการช่วยเหลือ
     *
     * Business Rules:
     * 1. staff ต้องมี active assignment (ACCEPTED) ใน incident นี้
     *
     * Side Effects:
     * - Assignment status → CANCELLED
     * - Team status → AVAILABLE
     * - ถ้าไม่มีทีมที่ ACCEPTED เหลือ → Incident status → REPORTED (กลับไปรอทีมรับ)
     *
     * @param staffId    ID ของ staff ที่ยกเลิก
     * @param incidentId ID ของ incident
     * @throws ResourceNotFoundException ถ้าไม่พบ assignment
     */
    IncidentForStaffResponseDTO cancelAssignment(Long staffId, Long incidentId);

    /**
     * ดึง incident ที่ทีมของ staff กำลังดำเนินการอยู่ (active mission)
     * ค้นหา assignment ที่ status = ACCEPTED ของทีมปัจจุบัน
     *
     * @param staffId ID ของ staff
     * @return DTO รายละเอียด incident ที่กำลังทำอยู่, null ถ้าไม่มี active mission
     * @throws ResourceNotFoundException ถ้า staff ไม่มีทีม
     */
    IncidentForStaffResponseDTO getMyActiveMission(Long staffId);
}
