package com.kku.emergency_alert_api.service.auth;

import org.springframework.web.server.ResponseStatusException;

import com.kku.emergency_alert_api.dto.auth.CurrentUserResponseDTO;
import com.kku.emergency_alert_api.dto.auth.LoginRequestDTO;
import com.kku.emergency_alert_api.dto.auth.LoginResponseDTO;
import com.kku.emergency_alert_api.dto.auth.RegisterReporterRequestDTO;
import com.kku.emergency_alert_api.dto.auth.RegisterStaffRequestDTO;

public interface AuthService {
    /**
     * สมัครผู้แจ้งเหตุ (Reporter) — เช็ค email ซ้ำ, hash password, generate JWT
     *
     * @param dto ข้อมูลสมัคร (email, fullName, phone, password)
     * @return token + ข้อมูล user (auto-login)
     * @throws ResponseStatusException 409 ถ้า email ซ้ำ
     */
    LoginResponseDTO registerReporter(RegisterReporterRequestDTO dto);

    /**
     * สมัครพนักงาน (Staff) — เช็ค email ซ้ำ, hash password, generate JWT
     *
     * @param dto ข้อมูลสมัคร (email, fullName, phone, role, password)
     * @return token + ข้อมูล user (auto-login)
     * @throws ResponseStatusException 409 ถ้า email ซ้ำ
     */
    LoginResponseDTO registerStaff(RegisterStaffRequestDTO dto);

    /**
     * เข้าสู่ระบบ Reporter — เช็ค email + password + isBlocked
     *
     * @param dto email + password
     * @return token + ข้อมูล user
     * @throws UnauthorizedException ถ้า email/password ไม่ถูก หรือถูก block
     */
    LoginResponseDTO loginReporter(LoginRequestDTO dto);

    /**
     * เข้าสู่ระบบ Staff — เช็ค email + password + isBlocked
     *
     * @param dto email + password
     * @return token + ข้อมูล user
     * @throws UnauthorizedException ถ้า email/password ไม่ถูก หรือถูก block
     */
    LoginResponseDTO loginStaff(LoginRequestDTO dto);

    /**
     * ดึงข้อมูล user ปัจจุบัน / ยืนยันตัวตน
     *
     * @return ข้อมูล user
     * @throws UnauthorizedException ถ้า
     */
    CurrentUserResponseDTO getCurrentUser();
}
