package com.example.SmartGov.controller;

import com.example.SmartGov.dto.LoginRequest;
import com.example.SmartGov.dto.OtpRequestDto;
import com.example.SmartGov.dto.OtpVerificationDTO;
import com.example.SmartGov.dto.RegisterRequest;
import com.example.SmartGov.payload.AuthResponse;
import com.example.SmartGov.service.AuthService;
import com.example.SmartGov.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    public AuthController(AuthService authService, OtpService otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            if (authService.existsByEmail(request.getEmail())) {
                return buildErrorResponse("Email already registered", HttpStatus.CONFLICT);
            }

            if (!otpService.isEmailVerified(request.getEmail())) {
                return buildErrorResponse("Please verify OTP before registration", HttpStatus.FORBIDDEN);
            }

            AuthResponse response = authService.register(request);
            return buildSuccessResponse(response, "Registration successful", HttpStatus.CREATED);

        } catch (Exception e) {
            return buildErrorResponse("Registration failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            // Check if OTP is verified
            if (!otpService.isEmailVerified(request.getEmail())) {
                return buildErrorResponse("OTP not verified or expired", HttpStatus.UNAUTHORIZED);
            }

            AuthResponse response = authService.login(request);
            return buildSuccessResponse(response, "Login successful", HttpStatus.OK);

        } catch (Exception e) {
            return buildErrorResponse("Login failed: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    // ================= SEND OTP =================
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(@Valid @RequestBody OtpRequestDto request) {
        try {
            otpService.createAndSendOTP(request);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP sent successfully");
            response.put("expiresIn", 600);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return buildErrorResponse("Failed to send OTP: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================= VERIFY OTP =================
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@Valid @RequestBody OtpVerificationDTO request) {
        try {
            boolean verified = otpService.verifyOTP(request);
            Map<String, Object> response = new HashMap<>();
            response.put("success", verified);
            response.put("message", verified ? "OTP verified successfully" : "Invalid or expired OTP");
            response.put("verified", verified);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return buildErrorResponse("OTP verification failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================= TEST =================
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Backend is working!");
        response.put("status", "OK");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    // ================= HELPERS =================
    private ResponseEntity<Map<String, Object>> buildErrorResponse(String message, HttpStatus status) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", message);
        return ResponseEntity.status(status).body(error);
    }

    private ResponseEntity<Map<String, Object>> buildSuccessResponse(AuthResponse response, String message, HttpStatus status) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", message);
        result.put("token", response.getToken());
        result.put("firstName", response.getFirstName());
        result.put("email", response.getEmail());
        return ResponseEntity.status(status).body(result);
    }
}