package com.genweb2.emb.listener;

import com.genweb2.emb.configuration.MessageBrokerInfo;
import com.genweb2.emb.dto.queue.NewMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
@Slf4j
public class ChatMessageListener {

    private final SimpMessagingTemplate simpMessagingTemplate;
    
    @RabbitListener(queues = "#{messageContentQueue.name}")
    public void newMessageListener(NewMessage message) {
        List.of(prepareDestination(message.sender()), prepareDestination(message.receiver()))
            .parallelStream()
            .forEach(destination -> simpMessagingTemplate.convertAndSend(destination, message));
    }

    private String prepareDestination(Long userId) {
        return String.format("/%s/chat/%s", MessageBrokerInfo.SIMPLE_BROKER.getName(), userId);
    }
}
