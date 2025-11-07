package com.cloudstorage.entity;

import jakarta.persistence.*;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    @Column(unique = true, nullable = false)
    private String email;
    private String name;
    private String password;
    private String role;
    private String status;
    private String plan;
    private String avatar;
    private String banReason;
    @Temporal(TemporalType.TIMESTAMP)
    private Date banDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();
}
