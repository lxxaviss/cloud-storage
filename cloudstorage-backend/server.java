package com.example.cloudstorage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CloudStorageApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudStorageApplication.class, args);
        System.out.println("🚀 Server running on port 8080");
        System.out.println("🔗 API URL: http://localhost:8080/api");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                if ("production".equals(System.getenv("NODE_ENV"))) {
                    registry.addMapping("/**")
                            .allowedOrigins("https://your-domain.com")
                            .allowedMethods("GET", "POST", "PUT", "DELETE")
                            .allowCredentials(true);
                } else {
                    registry.addMapping("/**")
                            .allowedOrigins("http://localhost:3000")
                            .allowedMethods("GET", "POST", "PUT", "DELETE")
                            .allowCredentials(true);
                }
            }
        };
    }

    @Bean
    public FilterRegistrationBean<CommonsRequestLoggingFilter> loggingFilter() {
        FilterRegistrationBean<CommonsRequestLoggingFilter> registrationBean = new FilterRegistrationBean<>();
        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();

        loggingFilter.setIncludeClientInfo(true);
        loggingFilter.setIncludeQueryString(true);
        loggingFilter.setIncludePayload(true);
        loggingFilter.setMaxPayloadLength(10000);

        registrationBean.setFilter(loggingFilter);
        return registrationBean;
    }
}
