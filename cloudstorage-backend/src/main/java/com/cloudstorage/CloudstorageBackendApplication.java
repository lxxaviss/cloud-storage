package com.cloudstorage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CloudstorageBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudstorageBackendApplication.class, args);
        System.out.println("✅ Cloud Storage Backend запущен на http://localhost:5000");
    }
}
