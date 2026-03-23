package com.kku.emergency_alert_api.service.admin;

import java.util.List;

import org.springframework.web.server.ResponseStatusException;

import com.kku.emergency_alert_api.dto.admin.AdminBlockStatusUserRequestDTO;
import com.kku.emergency_alert_api.dto.admin.AdminRequestDTO;
import com.kku.emergency_alert_api.dto.admin.AdminResponseDTO;
import com.kku.emergency_alert_api.dto.auth.LoginRequestDTO;
import com.kku.emergency_alert_api.dto.auth.LoginResponseDTO;
import com.kku.emergency_alert_api.exception.ResourceNotFoundException;

/**
 * จัดการข้อมูลผู้ดูแลระบบ (Admin) — CRUD operations
 */
public interface AdminService {

    /**
     * สร้าง admin ใหม่ — เช็ค email ซ้ำ และ hash password ก่อนบันทึก
     *
     * @param requestDTO ข้อมูล admin ที่ต้องการสร้าง (email, fullName, password)
     * @return ข้อมูล admin ที่สร้างเสร็จแล้ว (ไม่รวม password)
     * @throws ResponseStatusException 409 ถ้า email ซ้ำ
     */
    AdminResponseDTO create(AdminRequestDTO requestDTO);

    /**
     * ดึงรายชื่อ admin ทั้งหมดในระบบ
     *
     * @return รายการ admin ทั้งหมด
     */
    List<AdminResponseDTO> getAll();

    /**
     * ดึงข้อมูล admin ตาม ID
     *
     * @param id ID ของ admin ที่ต้องการ
     * @return ข้อมูล admin
     * @throws ResourceNotFoundException ถ้าไม่พบ admin
     */
    AdminResponseDTO getById(Long id);

    /**
     * แก้ไขข้อมูล admin — รองรับ partial update (ส่งเฉพาะ field ที่ต้องการแก้)
     *
     * @param id         ID ของ admin ที่ต้องการแก้ไข
     * @param requestDTO ข้อมูล admin ที่ต้องการแก้ไข (email, fullName, password)
     * @return ข้อมูล admin หลังแก้ไข
     * @throws ResourceNotFoundException ถ้าไม่พบ admin
     * @throws ResponseStatusException   409 ถ้า email ซ้ำกับคนอื่น
     */
    AdminResponseDTO update(Long id, AdminRequestDTO requestDTO);

    /**
     * ลบ admin ตาม ID
     *
     * @param id ID ของ admin ที่ต้องการลบ
     * @throws ResourceNotFoundException ถ้าไม่พบ admin
     */
    void delete(Long id);

    /**
     * ล็อกอินผู้ดูแลระบบ
     *
     * @param dto email + password
     * @return token + ข้อมูล user
     * @throws UnauthorizedException ถ้า email/password ไม่ถูก หรือถูก block
     */
    LoginResponseDTO loginAdmin(LoginRequestDTO requestDTO);

    /**
     * บล็อก/ปลดบล็อกผู้ใช้งาน
     *
     * @param targetId   ID ของผู้ใช้งานที่ต้องการบล็อก/ปลดบล็อก
     * @param requestDTO ข้อมูลการบล็อก/ปลดบล็อก
     * @throws ResourceNotFoundException ถ้าไม่พบผู้ใช้งาน
     * @throws IllegalArgumentException  ถ้าไม่สามารถบล็อก/ปลดบล็อกได้
     */
    void changeBlockStatusAndSaveHistory(Long targetId, AdminBlockStatusUserRequestDTO requestDTO);
}
