package com.example.SmartGov.service;

import com.example.SmartGov.dto.OtpRequestDto;
import com.example.SmartGov.dto.OtpVerificationDTO;
import com.example.SmartGov.entity.OtpVerification;
import com.example.SmartGov.enums.OTPType;
import com.example.SmartGov.repository.OtpVerificationRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    private final OtpVerificationRepository otpRepository;
    private final Environment env;
    private final EmailService emailService;

    @Value("${otp.expiry.minutes:10}")
    private int otpExpiryMinutes;

    @Value("${otp.max.attempts:3}")
    private int maxAttempts;

    @Value("${otp.max.resend:3}")
    private int maxResend;

    public OtpService(
            OtpVerificationRepository otpRepository,
            Environment env,
            EmailService emailService
    ) {
        this.otpRepository = otpRepository;
        this.env = env;
        this.emailService = emailService;
    }

    private String generateOTP() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    public OtpVerification createAndSendOTP(OtpRequestDto request) {

        OTPType type = OTPType.valueOf(request.getType().toUpperCase());

        LocalDateTime lastHour = LocalDateTime.now().minusHours(1);

        Long recentRequests =
                otpRepository.countByEmailAndOtpTypeAndCreatedAtAfter(
                        request.getEmail(),
                        type,
                        lastHour
                );

        boolean isDev = env.acceptsProfiles("dev");

        if (!isDev && recentRequests >= maxResend) {
            throw new RuntimeException("Maximum resend attempts reached.");
        }

        otpRepository.markAllAsVerified(request.getEmail(), type);

        String otpCode = generateOTP();

        OtpVerification otp = new OtpVerification();
        otp.setEmail(request.getEmail());
        otp.setOtpCode(otpCode);
        otp.setOtpType(type);
        otp.setCreatedAt(LocalDateTime.now());
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(otpExpiryMinutes));
        otp.setVerified(false);
        otp.setAttempts(0);

        otp = otpRepository.save(otp);

        sendOTPEmail(request.getEmail(), otpCode);

        return otp;
    }

    public boolean verifyOTP(OtpVerificationDTO request) {

        OTPType type = OTPType.valueOf(request.getType().toUpperCase());

        Optional<OtpVerification> otpOpt =
                otpRepository.findTopByEmailAndOtpTypeAndVerifiedFalseOrderByCreatedAtDesc(
                        request.getEmail(),
                        type
                );

        if (otpOpt.isEmpty()) return false;

        OtpVerification otp = otpOpt.get();

        if (otp.getExpiresAt().isBefore(LocalDateTime.now()))
            return false;

        if (otp.getAttempts() >= maxAttempts)
            return false;

        if (!otp.getOtpCode().equals(request.getOtp())) {

            otp.setAttempts(otp.getAttempts() + 1);
            otpRepository.save(otp);

            return false;
        }

        otp.setVerified(true);
        otpRepository.save(otp);

        return true;
    }

    public boolean isEmailVerified(String email) {

        Optional<OtpVerification> otpOpt =
                otpRepository.findTopByEmailAndOtpTypeOrderByCreatedAtDesc(
                        email,
                        OTPType.REGISTRATION
                );

        if (otpOpt.isEmpty()) return false;

        OtpVerification otp = otpOpt.get();

        return otp.getVerified() &&
                otp.getExpiresAt().isAfter(LocalDateTime.now());
    }

    private void sendOTPEmail(String toEmail, String otpCode) {

        boolean isDev = env.acceptsProfiles("dev");

        if (isDev) {

            System.out.println("\n=====================");
            System.out.println("DEV MODE OTP: " + otpCode);
            System.out.println("=====================\n");

            return;
        }

        emailService.sendOtpEmail(toEmail, otpCode, otpExpiryMinutes);
    }
}