package com.example.SmartGov.service;

import com.example.SmartGov.dto.OtpRequestDto;
import com.example.SmartGov.dto.OtpVerificationDTO;
import com.example.SmartGov.entity.OtpVerification;
import com.example.SmartGov.enums.OTPType;
import com.example.SmartGov.repository.OtpVerificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    private final OtpVerificationRepository otpRepository;
    private final JavaMailSender mailSender;
    private final Environment env; // to detect dev profile

    @Value("${otp.expiry.minutes:10}")
    private int otpExpiryMinutes;

    @Value("${otp.max.attempts:3}")
    private int maxAttempts;

    @Value("${otp.max.resend:3}")
    private int maxResend;

    @Value("${spring.mail.username:noreply@smartgov.in}")
    private String fromEmail;

    public OtpService(OtpVerificationRepository otpRepository, JavaMailSender mailSender, Environment env) {
        this.otpRepository = otpRepository;
        this.mailSender = mailSender;
        this.env = env;
    }

    // Generate 6-digit OTP
    private String generateOTP() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    // Create and Send OTP
    public OtpVerification createAndSendOTP(OtpRequestDto request) {
        try {
            OTPType type = OTPType.valueOf(request.getType().toUpperCase());

            // Rate limit check (skip in dev profile)
            LocalDateTime lastHour = LocalDateTime.now().minusHours(1);
            Long recentRequests = otpRepository
                    .countByEmailAndOtpTypeAndCreatedAtAfter(request.getEmail(), type, lastHour);

            boolean isDev = env.acceptsProfiles("dev"); // dev profile
            if (!isDev && recentRequests >= maxResend) {
                throw new RuntimeException("Maximum resend attempts reached. Please try again later.");
            }

            // Invalidate old OTPs
            otpRepository.markAllAsVerified(request.getEmail(), type);

            // Generate OTP
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

            // Send Email (or console print for dev)
            sendOTPEmail(request.getEmail(), otpCode);

            return otp;

        } catch (Exception e) {
            System.err.println("Failed to create/send OTP: " + e.getMessage());
            throw new RuntimeException("Failed to send OTP. Please try again later.");
        }
    }

    // Verify OTP
    public boolean verifyOTP(OtpVerificationDTO request) {
        try {
            OTPType type = OTPType.valueOf(request.getType().toUpperCase());

            Optional<OtpVerification> otpOpt =
                    otpRepository.findTopByEmailAndOtpTypeAndVerifiedFalseOrderByCreatedAtDesc(
                            request.getEmail(), type);

            if (otpOpt.isEmpty()) return false;

            OtpVerification otp = otpOpt.get();

            if (otp.getExpiresAt().isBefore(LocalDateTime.now())) return false;
            if (otp.getAttempts() >= maxAttempts) return false;
            if (!otp.getOtpCode().equals(request.getOtp())) {
                otp.setAttempts(otp.getAttempts() + 1);
                otpRepository.save(otp);
                return false;
            }

            otp.setVerified(true);
            otpRepository.save(otp);
            return true;

        } catch (Exception e) {
            System.err.println("OTP verification error: " + e.getMessage());
            return false;
        }
    }

    // Check if email already verified
    public boolean isEmailVerified(String email) {
        try {
            Optional<OtpVerification> otpOpt =
                    otpRepository.findTopByEmailAndOtpTypeOrderByCreatedAtDesc(
                            email, OTPType.REGISTRATION);

            if (otpOpt.isEmpty()) return false;

            OtpVerification otp = otpOpt.get();

            return otp.getVerified() &&
                    otp.getExpiresAt().isAfter(LocalDateTime.now());

        } catch (Exception e) {
            System.err.println("Email verification check failed: " + e.getMessage());
            return false;
        }
    }

    // Send OTP Email
    private void sendOTPEmail(String toEmail, String otpCode) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("SmartGov | Secure Email Verification OTP");
            message.setText(
                    "Dear User,\n\n" +
                            "Welcome to SmartGov – your digital platform for accessing government services quickly and securely.\n\n" +
                            "Your One-Time Password (OTP) is:\n\n" +
                            "OTP: " + otpCode + "\n\n" +
                            "This OTP is valid for " + otpExpiryMinutes + " minutes.\n" +
                            "Please do not share this OTP with anyone.\n\n" +
                            "Regards,\nSmartGov Team"
            );

            boolean isDev = env.acceptsProfiles("dev");
            if (!isDev) {
                mailSender.send(message);
                System.out.println("OTP email sent to: " + toEmail);
            } else {
                // Print OTP in console in dev mode
                System.out.println("\n===============================");
                System.out.println("DEV MODE - OTP for " + toEmail + ": " + otpCode);
                System.out.println("===============================\n");
            }

        } catch (Exception e) {
            System.err.println("Email sending failed: " + e.getMessage());
        }
    }
}