package com.example.SmartGov.controller;

import com.example.SmartGov.dto.UserDto;
import com.example.SmartGov.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/smartGov")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto){
        UserDto createdUser = userService.createUser(userDto);
        return new ResponseEntity<>(createdUser , HttpStatus.CREATED);
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<List<UserDto>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUser());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getUserCount(){
        return ResponseEntity.ok(userService.getUserCount());
    }

    @GetMapping("/getUserBy/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/updateAccount/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id , @Valid @RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }
}
