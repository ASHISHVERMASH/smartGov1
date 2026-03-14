package com.example.SmartGov.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Map;

@Service
public class EmailService {

    // Your SendGrid API key from Railway or environment variable
    @Value("${sendgrid.api.key}")
    private String sendgridApiKey;

    public void sendOtp(String toEmail, String otp) {

        try {
            RestTemplate restTemplate = new RestTemplate();

            // SendGrid v3 API endpoint
            String url = "https://api.sendgrid.com/v3/mail/send";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + sendgridApiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Email body using your verified Gmail
            Map<String, Object> body = Map.of(
                    "personalizations", new Object[]{
                            Map.of("to", new Object[]{ Map.of("email", toEmail) })
                    },
                    "from", Map.of("email", "tech.ashishverma@gmail.com", "name", "SmartGov"),
                    "subject", "SmartGov OTP Verification",
                    "content", new Object[]{ Map.of("type", "text/html", "value", "<h2>Your OTP is: " + otp + "</h2>") }
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("OTP email sent to: " + toEmail);
            } else {
                System.err.println("Failed to send OTP. Status: " + response.getStatusCode());
                System.err.println("Response: " + response.getBody());
            }

        } catch (Exception e) {
            System.err.println("SendGrid email failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}