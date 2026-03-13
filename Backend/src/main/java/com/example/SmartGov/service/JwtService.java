package com.example.SmartGov.service;

import com.example.SmartGov.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service("jwtServiceForUser")
public class JwtService {

    private final String SECRET_KEY = "MySuperSecretKeyForJWT"; // change for production

    public String generateToken(User user) {
        long expirationMillis = 1000 * 60 * 60 * 10; // 10 hours

        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}