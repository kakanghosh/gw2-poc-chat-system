package com.genweb2.emb.service;

import com.genweb2.emb.dto.queue.NewMessage;
import com.genweb2.emb.dto.request.CreateNewMessageInput;
import com.genweb2.emb.entity.ChatHistory;
import com.genweb2.emb.repository.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    private final ChatHistoryRepository chatHistoryRepository;
    private final FanoutExchange fanOutMessageContentExchange;
    private final RabbitTemplate rabbitTemplate;

    @Override
    public void saveNewMessage(CreateNewMessageInput createNewMessageInput) {
        var chatHistory = ChatHistory.builder()
                                     .senderId(createNewMessageInput.senderId())
                                     .receiverId(createNewMessageInput.receiverId())
                                     .content(createNewMessageInput.content())
                                     .build();
        chatHistoryRepository.save(chatHistory);
        rabbitTemplate.convertAndSend(
                fanOutMessageContentExchange.getName(),
                "",
                new NewMessage(chatHistory.getSenderId(), chatHistory.getReceiverId(), chatHistory.getContent()));
    }
}
