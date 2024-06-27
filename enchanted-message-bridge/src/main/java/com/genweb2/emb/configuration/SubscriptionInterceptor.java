package com.genweb2.emb.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class SubscriptionInterceptor implements ChannelInterceptor {

    private ConcurrentHashMap<String, Long> sessionIdToUserIdMap = new ConcurrentHashMap<>();

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        var accessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
            var sessionId = accessor.getSessionId();
            var destination = accessor.getDestination();
            extractSubscriberId(destination).ifPresent(userId -> {
                sessionIdToUserIdMap.put(sessionId, userId);
                updateUserOnlineStatus(userId, true);
            });
        } else if (StompCommand.DISCONNECT.equals(accessor.getCommand())) {
            var sessionId = accessor.getSessionId();
            var userId = getUserIdBySessionId(sessionId);
            removeUserBySessionId(sessionId);
            updateUserOnlineStatus(userId, false);
        }
        return message;
    }


    private void updateUserOnlineStatus(Long userId, boolean status) {
        log.info("SubscriberId: {}, status: {}", userId, status);
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
