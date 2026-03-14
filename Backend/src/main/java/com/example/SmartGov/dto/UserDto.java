package com.example.SmartGov.dto;

import com.example.SmartGov.enums.ROLES;
import com.example.SmartGov.enums.States;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserDto {

    private Long id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number")
    private String mobileNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotNull(message = "State is required")
    private States state;

    private ROLES role = ROLES.CITIZENS;
}