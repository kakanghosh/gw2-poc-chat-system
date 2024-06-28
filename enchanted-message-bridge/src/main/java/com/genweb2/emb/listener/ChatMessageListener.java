package com.genweb2.emb.listener;

import com.genweb2.emb.configuration.MessageBrokerInfo;
import com.genweb2.emb.dto.queue.NewMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class ChatMessageListener {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @RabbitListener(queues = "#{messageContentQueue.name}")
    public void onlineStatusQueueListener(NewMessage message) {
        var destination = String.format("/%s/chat/%s", MessageBrokerInfo.SIMPLE_BROKER.getName(), message.receiver());
        log.info("NewMessage: {}, destination: {}", message, destination);
        simpMessagingTemplate.convertAndSend(destination, message);
    }
}
