package com.genweb2.emb.controller;

import com.genweb2.emb.dto.request.ChatHistoryRequestInput;
import com.genweb2.emb.dto.response.ChatHistoryResponse;
import com.genweb2.emb.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chats")
public class ChatController {

    private final ChatService chatService;

    @GetMapping("senders/{senderId}/receivers/{receiverId}")
    public ResponseEntity<ChatHistoryResponse> getChatHistories(@PathVariable Long senderId,
                                                                @PathVariable Long receiverId,
                                                                @RequestParam Integer pageNumber,
                                                                @RequestParam Integer limit) {
        var chatHistories = chatService.getChatHistories(new ChatHistoryRequestInput(senderId, receiverId, pageNumber, limit));
        return ResponseEntity.ok(chatHistories);
    }
}
