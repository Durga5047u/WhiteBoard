package com.practice.websocketspractice.repository;

import com.practice.websocketspractice.entity.Stroke;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface StrokeRepository extends JpaRepository<Stroke, UUID> {
}
