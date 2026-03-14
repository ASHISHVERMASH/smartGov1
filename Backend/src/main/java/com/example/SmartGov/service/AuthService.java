package com.example.SmartGov.service;

import com.example.SmartGov.dto.LoginRequest;
import com.example.SmartGov.dto.RegisterRequest;
import com.example.SmartGov.entity.User;
import com.example.SmartGov.enums.ROLES;
import com.example.SmartGov.enums.States;
import com.example.SmartGov.payload.AuthResponse;
import com.example.SmartGov.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       OtpService otpService,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpService = otpService;
        this.jwtService = jwtService;
    }

    // ================= LOGIN =================
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email"));

        if (!otpService.isEmailVerified(request.getEmail())) {
            throw new RuntimeException("OTP not verified or expired");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user);

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setFirstName(user.getFirstName());
        response.setEmail(user.getEmail());

        return response;
    }

    // ================= REGISTER =================
    public AuthResponse register(RegisterRequest request) {

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setMobileNumber(request.getMobileNumber()); // FIX
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setState(States.valueOf(request.getState())); // convert String → Enum
        user.setRole(ROLES.CITIZENS);

        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setFirstName(user.getFirstName());
        response.setEmail(user.getEmail());

        return response;
    }

    // ================= HELPER =================
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}