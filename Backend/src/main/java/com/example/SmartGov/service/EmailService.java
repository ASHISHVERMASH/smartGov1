package com.example.SmartGov.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;

@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    public void sendOtp(String toEmail, String otp) {

        try {

            RestTemplate restTemplate = new RestTemplate();

            String url = "https://api.resend.com/emails";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + resendApiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> body = Map.of(
                    "from", "SmartGov <onboarding@resend.dev>",
                    "to", new String[]{toEmail},
                    "subject", "SmartGov OTP Verification",
                    "html", "<h2>Your OTP is: " + otp + "</h2>"
            );

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            restTemplate.postForEntity(url, request, String.class);

            System.out.println("OTP email sent to: " + toEmail);

        } catch (Exception e) {
            System.err.println("Resend email failed: " + e.getMessage());
        }
    }
}