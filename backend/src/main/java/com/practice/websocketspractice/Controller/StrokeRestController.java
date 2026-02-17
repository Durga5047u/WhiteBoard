package com.practice.websocketspractice.Controller;

import com.practice.websocketspractice.entity.Stroke;
import com.practice.websocketspractice.service.StrokeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/strokes")
@CrossOrigin("*")
public class StrokeRestController {

    private final StrokeService strokeService;

    public StrokeRestController(StrokeService strokeService) {
        this.strokeService = strokeService;
    }

    @GetMapping
    public List<Stroke> getAll() {
        return strokeService.getAllStrokes();
    }
}

