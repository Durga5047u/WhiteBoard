package com.practice.websocketspractice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stroke {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(columnDefinition = "TEXT")
    private String data;   // JSON stroke

    private LocalDateTime createdAt;

    public Stroke(String data) {
        this.data = data;
        this.createdAt = LocalDateTime.now();
    }
}
