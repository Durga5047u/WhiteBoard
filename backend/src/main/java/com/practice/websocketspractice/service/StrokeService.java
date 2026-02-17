package com.practice.websocketspractice.service;

import com.practice.websocketspractice.entity.Stroke;
import com.practice.websocketspractice.repository.StrokeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StrokeService {

    private final StrokeRepository strokeRepository;

    public StrokeService(StrokeRepository strokeRepository) {
        this.strokeRepository = strokeRepository;
    }

    public void saveStroke(String json) {
        strokeRepository.save(new Stroke(json));
    }

    public List<Stroke> getAllStrokes() {
        return strokeRepository.findAll();
    }

    public void clearBoard() {
        strokeRepository.deleteAll();
    }
}
