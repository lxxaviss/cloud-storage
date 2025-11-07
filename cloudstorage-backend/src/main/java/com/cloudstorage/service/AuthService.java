package com.cloudstorage.service;

import com.cloudstorage.entity.User;
import com.cloudstorage.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setRole("USER");
        user.setStatus("ACTIVE");
        user.setPlan("free");
        user.setAvatar("https://ui-avatars.com/api/?name=" + user.getName().replace(" ", "+") + "&background=4f46e5&color=fff");
        user.setCreatedAt(new Date());

        return userRepository.save(user);
    }
}
