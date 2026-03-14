package com.example.SmartGov.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${mail.from}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otpCode, int expiryMinutes) {

        try {

            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("SmartGov | Email Verification OTP");

            message.setText(
                    "Your SmartGov OTP is: " + otpCode +
                            "\n\nThis OTP will expire in " + expiryMinutes + " minutes." +
                            "\n\nIf you did not request this, please ignore this email."
            );

            mailSender.send(message);

            System.out.println("OTP email sent to: " + toEmail);

        } catch (Exception e) {
            System.err.println("Email sending failed: " + e.getMessage());
        }
    }
}