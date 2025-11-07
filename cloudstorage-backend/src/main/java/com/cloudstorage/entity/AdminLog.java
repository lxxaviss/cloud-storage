package com.cloudstorage.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "admin_logs")
public class AdminLog {

    @Id
    @GeneratedValue
    private UUID id;

    private String action;
    private String target;
    private String reason;

    private LocalDateTime timestamp = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin;

    public AdminLog() {}

    public AdminLog(String action, String target, String reason, User admin) {
        this.action = action;
        this.target = target;
        this.reason = reason;
        this.admin = admin;
        this.timestamp = LocalDateTime.now(); // ✅ правильный тип
    }

    // getters & setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }
}
