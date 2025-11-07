package com.cloudstorage.controller;

import com.cloudstorage.entity.User;
import com.cloudstorage.entity.AdminLog;
import com.cloudstorage.service.AdminService;
import com.cloudstorage.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;
    private final UserRepository userRepository;
    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }    @GetMapping("/users")
    public List<User> getUsers() {
        return adminService.getUsers();
    }

    
    @PostMapping("/ban/{userId}")
    public String banUser(@PathVariable Long userId, @RequestParam String reason) {
        User admin = userRepository.findByEmail("admin@example.com").orElseThrow(); 
        return adminService.banUser(userId, reason, admin);
    }
    @PostMapping("/unban/{userId}")
    public String unbanUser(@PathVariable Long userId) {
        User admin = userRepository.findByEmail("admin@example.com").orElseThrow();
        return adminService.unbanUser(userId, admin);
    }

    @DeleteMapping("/delete/{userId}")
    public String deleteUser(@PathVariable Long userId) {
        User admin = userRepository.findByEmail("admin@example.com").orElseThrow();
        return adminService.deleteUser(userId, admin);
    }
    @GetMapping("/logs")
    public List<AdminLog> getLogs() {
        return adminService.getLogs();
    }
}
