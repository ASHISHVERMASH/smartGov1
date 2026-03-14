package com.example.SmartGov.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank
    private String firstName;

    private String lastName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String mobileNumber;   // ✅ ADD THIS

    @NotBlank
    private String password;

    // Getters & Setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobileNumber() { return mobileNumber; }   // ✅
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; } // ✅

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}