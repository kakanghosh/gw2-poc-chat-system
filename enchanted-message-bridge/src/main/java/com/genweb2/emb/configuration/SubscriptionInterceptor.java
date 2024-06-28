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

import java.util.List;
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
        if (StompCommand.DISCONNECT.equals(accessor.getCommand())) {
            var sessionId = accessor.getSessionId();
            Optional.ofNullable(getUserIdBySessionId(sessionId))
                    .ifPresent((userId) -> {
                        removeUserBySessionId(sessionId);
                        userOnlineStatusService.updateUserOnlineStatus(new UserOnlineStatusUpdateInput(userId, false));
                    });
        }
        return message;
    }

    public Long getUserIdBySessionId(String sessionId) {
        return sessionIdToUserIdMap.get(sessionId);
    }

    public void putUserIdOnSessionMap(String sessionId, Long userId) {
        sessionIdToUserIdMap.putIfAbsent(sessionId, userId);
    }

    public void removeUserBySessionId(String sessionId) {
        sessionIdToUserIdMap.remove(sessionId);
    }

    public List<Long> getAllSessionUserId() {
        return sessionIdToUserIdMap.values()
                                   .stream()
                                   .toList();
    }
}
