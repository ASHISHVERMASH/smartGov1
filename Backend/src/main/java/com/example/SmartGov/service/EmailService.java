package com.example.SmartGov.service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY}")
    private String apiKey;

    private final OkHttpClient client = new OkHttpClient();

    public void sendOtpEmail(String toEmail, String otpCode, int expiryMinutes) {

        try {

            String json = """
            {
              "sender": {"email": "tech.ashishverma@gmail.com"},
              "to": [{"email": "%s"}],
              "subject": "SmartGov | Email Verification OTP",
              "htmlContent": "<h3>Your OTP is: %s</h3><p>Expires in %d minutes</p>"
            }
            """.formatted(toEmail, otpCode, expiryMinutes);

            RequestBody body = RequestBody.create(
                    json,
                    MediaType.parse("application/json")
            );

            Request request = new Request.Builder()
                    .url("https://api.brevo.com/v3/smtp/email")
                    .post(body)
                    .addHeader("accept", "application/json")
                    .addHeader("api-key", apiKey)
                    .addHeader("content-type", "application/json")
                    .build();

            Response response = client.newCall(request).execute();

            System.out.println("Brevo response: " + response.code());

        } catch (Exception e) {
            System.err.println("Email sending failed: " + e.getMessage());
        }
    }
}