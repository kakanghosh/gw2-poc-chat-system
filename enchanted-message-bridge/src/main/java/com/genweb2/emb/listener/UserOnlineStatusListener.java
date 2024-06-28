package com.genweb2.emb.listener;

import com.genweb2.emb.configuration.MessageBrokerInfo;
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

    @RabbitListener(queues = "#{onlineStatusQueue.name}")
    public void onlineStatusQueueListener(UserOnlineStatus onlineStatus) {
        // TODO Need to broadcast this online message to all the currently online user
        var destination = String.format("/%s/status/%s", MessageBrokerInfo.SIMPLE_BROKER.getName(), 5);
        log.info("UserOnlineStatus: {}, destination: {}", onlineStatus, destination);
        simpMessagingTemplate.convertAndSend(destination, onlineStatus);
    }
}
