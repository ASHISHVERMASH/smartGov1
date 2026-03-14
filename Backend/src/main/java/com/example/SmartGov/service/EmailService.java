package com.example.SmartGov.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;

@Service
public class EmailService {

    @Value("${SENDGRID_API_KEY}")
    private String sendgridApiKey;

    private final String SENDGRID_URL = "https://api.sendgrid.com/v3/mail/send";

    public void sendOtpEmail(String toEmail, String otpCode, int expiryMinutes) {

        try {

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(sendgridApiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> body = Map.of(
                    "personalizations", new Object[]{
                            Map.of(
                                    "to", new Object[]{
                                            Map.of("email", toEmail)
                                    }
                            )
                    },
                    "from", Map.of(
                            "email", "tech.ashishverma@gmail.com",
                            "name", "SmartGov"
                    ),
                    "subject", "SmartGov | Email Verification OTP",
                    "content", new Object[]{
                            Map.of(
                                    "type", "text/html",
                                    "value",
                                    "<h2>Your OTP is: " + otpCode + "</h2>" +
                                            "<p>This OTP is valid for <b>" + expiryMinutes + " minutes</b>.</p>"
                            )
                    }
            );

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(SENDGRID_URL, request, String.class);

            System.out.println("SendGrid Status: " + response.getStatusCode());

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("OTP email sent to: " + toEmail);
            } else {
                System.err.println("Email sending failed: " + response.getBody());
            }

        } catch (Exception e) {
            System.err.println("SendGrid email failed: " + e.getMessage());
        }
    }
}