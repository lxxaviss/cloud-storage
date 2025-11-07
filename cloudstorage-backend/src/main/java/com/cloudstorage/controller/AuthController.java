package com.cloudstorage.controller;

import com.cloudstorage.entity.User;
import com.cloudstorage.repository.UserRepository;
import com.cloudstorage.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Разрешить фронту подключаться
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    // 📌 Регистрация
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User createdUser = authService.register(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 📌 Логин
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> found = userRepository.findByEmail(loginRequest.getEmail());

        if (found.isEmpty())
            return ResponseEntity.status(404).body("User not found");

        User user = found.get();

        if (!user.getPassword().equals(loginRequest.getPassword()))
            return ResponseEntity.status(401).body("Invalid password");

        if ("BANNED".equalsIgnoreCase(user.getStatus()))
            return ResponseEntity.status(403).body("User is banned");

        return ResponseEntity.ok(user);
    }
}
