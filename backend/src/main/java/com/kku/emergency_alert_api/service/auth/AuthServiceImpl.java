package com.kku.emergency_alert_api.service.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.kku.emergency_alert_api.constant.UserRoleEnum;
import com.kku.emergency_alert_api.context.UserContextProvider;
import com.kku.emergency_alert_api.dto.auth.UserPrincipalResponseDTO;
import com.kku.emergency_alert_api.dto.auth.LoginRequestDTO;
import com.kku.emergency_alert_api.dto.auth.LoginResponseDTO;
import com.kku.emergency_alert_api.dto.auth.RegisterReporterRequestDTO;
import com.kku.emergency_alert_api.dto.auth.RegisterStaffRequestDTO;
import com.kku.emergency_alert_api.entity.ReporterEntity;
import com.kku.emergency_alert_api.entity.StaffEntity;
import com.kku.emergency_alert_api.exception.UnauthorizedException;
import com.kku.emergency_alert_api.models.UserPrincipal;
import com.kku.emergency_alert_api.repository.AdminRepository;
import com.kku.emergency_alert_api.repository.ReporterRepository;
import com.kku.emergency_alert_api.repository.StaffRepository;
import com.kku.emergency_alert_api.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {
    private final ReporterRepository reporterRepository;
    private final StaffRepository staffRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserContextProvider userContextProvider;

    public AuthServiceImpl(
            ReporterRepository reporterRepository,
            StaffRepository staffRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            UserContextProvider userContextProvider, AdminRepository adminRepository) {
        this.reporterRepository = reporterRepository;
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userContextProvider = userContextProvider;
        this.adminRepository = adminRepository;
    }

    @Override
    @Transactional
    public LoginResponseDTO registerReporter(RegisterReporterRequestDTO dto) {
        if (reporterRepository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(dto.getPassword());

        ReporterEntity reporterToCreate = new ReporterEntity();
        reporterToCreate.setEmail(dto.getEmail());
        reporterToCreate.setFullName(dto.getFullName());
        reporterToCreate.setPhone(dto.getPhone());
        reporterToCreate.setPasswordHash(encodedPassword);

        ReporterEntity created = reporterRepository.save(reporterToCreate);

        // สร้าง token (format: "id:REPORTER")
        String token = jwtUtil.generateToken(created.getId() + ":" + UserRoleEnum.REPORTER.name());

        return LoginResponseDTO.fromEntity(created, token);
    }

    @Override
    @Transactional
    public LoginResponseDTO registerStaff(RegisterStaffRequestDTO dto) {
        if (staffRepository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        StaffEntity staffToCreate = new StaffEntity();
        staffToCreate.setEmail(dto.getEmail());
        staffToCreate.setFullName(dto.getFullName());
        staffToCreate.setPhone(dto.getPhone());
        staffToCreate.setStaffRole(dto.getStaffRole());
        staffToCreate.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        StaffEntity saved = staffRepository.save(staffToCreate);

        // สร้าง token (format: "id:STAFF")
        String token = jwtUtil.generateToken(saved.getId() + ":" + UserRoleEnum.STAFF.name());

        return LoginResponseDTO.fromEntity(saved, token);
    }

    @Override
    @Transactional
    public LoginResponseDTO loginReporter(LoginRequestDTO dto) {
        ReporterEntity reporter = reporterRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        // เช็ค password
        boolean isValid = passwordEncoder.matches(dto.getPassword(), reporter.getPasswordHash());
        if (!isValid) {
            throw new UnauthorizedException("Invalid email or password");
        }

        // เช็คว่าถูก block หรือไม่
        if (reporter.getIsBlocked()) {
            throw new UnauthorizedException("Account is blocked");
        }

        String token = jwtUtil.generateToken(reporter.getId() + ":" + UserRoleEnum.REPORTER.name());

        return LoginResponseDTO.fromEntity(reporter, token);
    }

    @Override
    @Transactional
    public LoginResponseDTO loginStaff(LoginRequestDTO dto) {
        StaffEntity staff = staffRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        // เช็ค password
        boolean isValid = passwordEncoder.matches(dto.getPassword(), staff.getPasswordHash());
        if (!isValid) {
            throw new UnauthorizedException("Invalid email or password");
        }

        // เช็คว่าถูก block หรือไม่
        if (Boolean.TRUE.equals(staff.getIsBlocked())) {
            throw new UnauthorizedException("Account is blocked");
        }

        // สร้าง token
        String token = jwtUtil.generateToken(staff.getId() + ":" + UserRoleEnum.STAFF.name());

        return LoginResponseDTO.fromEntity(staff, token);
    }

    @Override
    @Transactional(readOnly = true)
    public UserPrincipalResponseDTO getCurrentUser() {
        Long userId = userContextProvider.getCurrentUserId();
        UserRoleEnum role = userContextProvider.getCurrentUserRole();

        // System.out.println("getCurrentUser: " + userId + " " + role);

        UserPrincipal user = null;

        switch (role) {
            case UserRoleEnum.REPORTER:
                user = reporterRepository.findById(userId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
                break;
            case UserRoleEnum.STAFF:
                user = staffRepository.findById(userId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
                break;
            case UserRoleEnum.ADMIN:
                user = adminRepository.findById(userId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
                break;
            default:
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        return UserPrincipalResponseDTO.fromEntity(user);
    }
}
