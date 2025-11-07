package com.cloudstorage.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "files")
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String originalName;
    private Integer size;
    private String type;
    private String mimeType;
    private String path;
    private String url;

    private LocalDateTime uploadDate = LocalDateTime.now();
    private LocalDateTime lastAccessed;
    private Integer downloads = 0;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
