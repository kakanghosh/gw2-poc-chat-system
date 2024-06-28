package com.genweb2.emb.configuration;

import com.genweb2.emb.dto.request.UserOnlineStatusUpdateInput;
import com.genweb2.emb.service.UserOnlineStatusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Component
@Slf4j
public class SubscriptionInterceptor implements ChannelInterceptor {

    private final ConcurrentHashMap<String, Long> sessionIdToUserIdMap = new ConcurrentHashMap<>();
    private final UserOnlineStatusService userOnlineStatusService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        var accessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
            var sessionId = accessor.getSessionId();
            var destination = accessor.getDestination();
            log.info("Destination: {}", destination);
            extractSubscriberId(destination).ifPresent(userId -> {
                sessionIdToUserIdMap.put(sessionId, userId);
                updateUserOnlineStatus(userId, true);
            });
        } else if (StompCommand.DISCONNECT.equals(accessor.getCommand())) {
            var sessionId = accessor.getSessionId();
            if (sessionIdToUserIdMap.containsKey(sessionId)) {
                var userId = getUserIdBySessionId(sessionId);
                removeUserBySessionId(sessionId);
                updateUserOnlineStatus(userId, false);
            }
        }
        return message;
    }


    private void updateUserOnlineStatus(Long userId, boolean status) {
        log.info("SubscriberId: {}, status: {}", userId, status);
        userOnlineStatusService.updateUserOnlineStatus(new UserOnlineStatusUpdateInput(userId, status));
    }

    private Optional<Long> extractSubscriberId(String destination) {
        if (destination != null && destination.startsWith("/topic/chat/")) {
            var subscriberId = destination.substring("/topic/chat/".length());
            return Optional.of(Long.parseLong(subscriberId));
        }
        return Optional.empty();
    }

    public Long getUserIdBySessionId(String sessionId) {
        return sessionIdToUserIdMap.get(sessionId);
    }

    public void removeUserBySessionId(String sessionId) {
        sessionIdToUserIdMap.remove(sessionId);
    }
}
