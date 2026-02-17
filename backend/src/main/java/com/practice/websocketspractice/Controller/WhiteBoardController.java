package com.practice.websocketspractice.Controller;

import com.practice.websocketspractice.service.StrokeService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WhiteBoardController {

    private final StrokeService strokeService;

    public WhiteBoardController(StrokeService strokeService) {
        this.strokeService = strokeService;
    }

    @MessageMapping("/draw")
    @SendTo("/topic/drawings")
    public String broadcastStroke(String strokeJson) {

        strokeService.saveStroke(strokeJson);
        return strokeJson;
    }

    @MessageMapping("/clear")
    @SendTo("/topic/clear")
    public String clearBoard(String message) {

        strokeService.clearBoard();
        return "CLEAR";
    }
}
