package com.genweb2.emb.controller;

import com.genweb2.emb.configuration.SubscriptionInterceptor;
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
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
@Slf4j
public class MessageController {

    private final ChatService chatService;
    private final UserOnlineStatusService userOnlineStatusService;
    private final SubscriptionInterceptor subscriptionInterceptor;

    @MessageMapping("/chat/{senderId}")
    public void onNewMessage(@DestinationVariable Long senderId, @Payload ChatMessage message) {
        chatService.saveNewMessage(new CreateNewMessageInput(senderId, message.receiverId(), message.content(), null));
    }

    @MessageMapping("/status/{senderId}/online")
    public void onUserGettingOnline(@DestinationVariable Long senderId, SimpMessageHeaderAccessor headerAccessor) {
        subscriptionInterceptor.putUserIdOnSessionMap(headerAccessor.getSessionId(), senderId);
        userOnlineStatusService.updateUserOnlineStatus(new UserOnlineStatusUpdateInput(senderId, true));
    }
}
