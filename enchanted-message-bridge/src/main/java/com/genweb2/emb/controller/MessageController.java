package com.genweb2.emb.controller;

import com.genweb2.emb.dto.ChatMessage;
import com.genweb2.emb.dto.CreateNewMessageInput;
import com.genweb2.emb.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
@Slf4j
public class MessageController {

    private final ChatService chatService;

    @MessageMapping("/chat/{senderId}")
    public void greeting(@DestinationVariable Long senderId, @Payload ChatMessage message) {
        chatService.saveNewMessage(new CreateNewMessageInput(senderId, message.receiverId(), message.content()));
    }
}
