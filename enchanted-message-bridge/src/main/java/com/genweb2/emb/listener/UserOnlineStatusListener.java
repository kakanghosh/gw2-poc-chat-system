package com.genweb2.emb.listener;

import com.genweb2.emb.configuration.MessageBrokerInfo;
import com.genweb2.emb.configuration.SubscriptionInterceptor;
import com.genweb2.emb.dto.queue.UserOnlineStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class UserOnlineStatusListener {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final SubscriptionInterceptor subscriptionInterceptor;

    @RabbitListener(queues = "#{onlineStatusQueue.name}")
    public void onlineStatusQueueListener(UserOnlineStatus onlineStatus) {
        subscriptionInterceptor.getAllSessionUserId()
                               .parallelStream()
                               .map(this::prepareDestination)
                               .forEach(destination -> simpMessagingTemplate.convertAndSend(destination, onlineStatus));
    }

    private String prepareDestination(Long userId) {
        return String.format("/%s/status/%s", MessageBrokerInfo.SIMPLE_BROKER.getName(), userId);
    }
}
