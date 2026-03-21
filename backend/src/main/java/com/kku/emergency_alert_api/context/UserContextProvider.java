package com.kku.emergency_alert_api.context;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.kku.emergency_alert_api.constant.UserRoleEnum;

/**
 * สำหรับเข้าถึงข้อมูล user ปัจจุบันใน request scope
 * ใช้ใน Service layer เพื่อดึง current user โดยไม่ต้องรับ parameter จาก
 * Controller
 *
 * เนื่องจากระบบมี 3 ประเภท user (Reporter, Staff, Admin) ที่แยก table กัน
 * จึงเก็บ id + role เพื่อให้ Service layer ไปดึง entity จาก repository
 * ที่ถูกต้อง
 * เก็บข้อมูล user ใน ThreadLocal (request scope)
 *
 * ทำงานร่วมกับ AuthInterceptor:
 * 1. preHandle → set id + role จาก JWT
 * 2. Service layer → get id + role
 * 3. afterCompletion → clear (ป้องกัน memory leak)
 */
@Component
public class UserContextProvider {

    private static final ThreadLocal<Long> userIdHolder = new ThreadLocal<>();
    private static final ThreadLocal<UserRoleEnum> userRoleHolder = new ThreadLocal<>();
    private static final Logger logger = LoggerFactory.getLogger(UserContextProvider.class);

    // ใช้โดย AuthInterceptor เท่านั้น
    public void setCurrentUser(Long userId, UserRoleEnum role) {
        if (userId == null || role == null) {
            logger.warn("Attempting to set null userId or role");
            return;
        }
        userIdHolder.set(userId);
        userRoleHolder.set(role);
        logger.debug("Set user: id={}, role={} for thread: {}", userId, role, Thread.currentThread().getName());
    }

    /**
     * ดึง ID ของ user ที่ login อยู่ใน request ปัจจุบัน
     *
     * @return ID ของ user (ใช้ร่วมกับ role เพื่อ query จาก repository ที่ถูกต้อง)
     * @throws IllegalStateException ถ้ายังไม่ได้ login (ไม่มี context)
     */
    public Long getCurrentUserId() {
        Long userId = userIdHolder.get();
        if (userId == null) {
            logger.error("No user found in context for thread: {}", Thread.currentThread().getName());
            throw new IllegalStateException("No user context available. User may not be authenticated.");
        }
        return userId;
    }

    /**
     * ดึง role ของ user ที่ login อยู่ใน request ปัจจุบัน
     *
     * @return role ของ user (REPORTER, STAFF, หรือ ADMIN)
     * @throws IllegalStateException ถ้ายังไม่ได้ login (ไม่มี context)
     */
    public UserRoleEnum getCurrentUserRole() {
        UserRoleEnum role = userRoleHolder.get();
        if (role == null) {
            throw new IllegalStateException("No user role in context.");
        }
        return role;
    }

    // ใช้โดย AuthInterceptor เท่านั้น (ใน afterCompletion)
    public void clear() {
        Long userId = userIdHolder.get();
        userIdHolder.remove();
        userRoleHolder.remove();
        if (userId != null) {
            logger.debug("Cleared user: id={} from thread: {}", userId, Thread.currentThread().getName());
        }
    }

    public boolean hasUser() {
        return userIdHolder.get() != null;
    }
}
