package com.example.SmartGov.service;

import com.example.SmartGov.dto.LoginRequest;
import com.example.SmartGov.entity.User;
import com.example.SmartGov.payload.AuthResponse;
import com.example.SmartGov.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.SmartGov.dto.RegisterRequest;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    private final JwtService jwtService; // assume you have a JWT token generator

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
        // 1️⃣ Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email"));

        // 2️⃣ Check if OTP verified
        boolean otpVerified = otpService.isEmailVerified(request.getEmail());
        if (!otpVerified) {
            throw new RuntimeException("OTP not verified or expired");
        }

        // 3️⃣ Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 4️⃣ Generate JWT token
        String token = jwtService.generateToken(user);

        // 5️⃣ Return AuthResponse
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setFirstName(user.getFirstName());
        response.setEmail(user.getEmail());

        return response;
    }

    // ================= REGISTER =================
    public AuthResponse register(RegisterRequest request) {
        // Save user to DB (hash password)
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        // Generate JWT
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