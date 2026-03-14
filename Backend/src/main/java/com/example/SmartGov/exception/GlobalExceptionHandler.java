package com.example.SmartGov.exception;

import com.example.SmartGov.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResouceNotFoundException.class)
    public ResponseEntity<ApiResponse> handlerResourceNotFoundException(ResouceNotFoundException exception){

        ApiResponse response = ApiResponse.builder()
                .message(exception.getMessage())
                .success(false)
                .status(HttpStatus.NOT_FOUND)
                .build();

        return new ResponseEntity<>(response , HttpStatus.NOT_FOUND);
    }

    // ✅ ADD THIS METHOD
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse> handlerDuplicateResourceException(DuplicateResourceException exception){

        ApiResponse response = ApiResponse.builder()
                .message(exception.getMessage())
                .success(false)
                .status(HttpStatus.BAD_REQUEST)
                .build();

        return new ResponseEntity<>(response , HttpStatus.BAD_REQUEST);
    }
}