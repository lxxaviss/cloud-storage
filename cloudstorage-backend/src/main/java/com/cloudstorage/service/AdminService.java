package com.cloudstorage.service;
import com.cloudstorage.entity.User;
import com.cloudstorage.entity.FileEntity;
import com.cloudstorage.entity.AdminLog;
import com.cloudstorage.repository.UserRepository;
import com.cloudstorage.repository.FileRepository;
import com.cloudstorage.repository.AdminLogRepository;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
@Service
public class AdminService {
    private final UserRepository userRepository;
    private final FileRepository fileRepository;
    private final AdminLogRepository adminLogRepository;
    public AdminService(UserRepository userRepository,
                        FileRepository fileRepository,
                        AdminLogRepository adminLogRepository) {
        this.userRepository = userRepository;
        this.fileRepository = fileRepository;
        this.adminLogRepository = adminLogRepository;
    }
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    public String banUser(Long userId, String reason, User admin) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if ("ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Нельзя банить администратора");
        }
        user.setStatus("BANNED");
        user.setBanReason(reason);
        user.setBanDate(new Date());
        userRepository.save(user);
        adminLogRepository.save(new AdminLog("BAN", user.getEmail(), reason, admin));
        return "User banned successfully";
    }
    public String unbanUser(Long userId, User admin) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus("ACTIVE");
        user.setBanReason(null);
        user.setBanDate(null);
        userRepository.save(user);
        adminLogRepository.save(new AdminLog("UNBAN", user.getEmail(), "Account restored", admin));
        return "User unbanned successfully";
    }

    public String deleteUser(Long userId, User admin) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if ("ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Нельзя удалить администратора");
        }
        List<FileEntity> files = fileRepository.findByUser_Id(userId);
        fileRepository.deleteAll(files);
        userRepository.delete(user);
        adminLogRepository.save(new AdminLog("DELETE", user.getEmail(), "Account deleted", admin));
        return "User deleted successfully";
    }
    public List<AdminLog> getLogs() {
        return adminLogRepository.findAll();
    }
}
