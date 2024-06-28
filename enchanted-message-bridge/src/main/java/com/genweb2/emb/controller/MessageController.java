package com.genweb2.emb.controller;

import com.genweb2.emb.dto.request.CreateNewMessageInput;
import com.genweb2.emb.dto.request.UserOnlineStatusUpdateInput;
import com.genweb2.emb.dto.stomp.ChatMessage;
import com.genweb2.emb.service.ChatService;
import com.genweb2.emb.service.UserOnlineStatusService;
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
    private final UserOnlineStatusService userOnlineStatusService;

    @MessageMapping("/chat/{senderId}")
    public void onNewMessage(@DestinationVariable Long senderId, @Payload ChatMessage message) {
        chatService.saveNewMessage(new CreateNewMessageInput(senderId, message.receiverId(), message.content()));
    }

    @MessageMapping("/status/{senderId}/online")
    public void onUserGettingOnline(@DestinationVariable Long senderId) {
        userOnlineStatusService.updateUserOnlineStatus(new UserOnlineStatusUpdateInput(senderId, true));
    }
}
