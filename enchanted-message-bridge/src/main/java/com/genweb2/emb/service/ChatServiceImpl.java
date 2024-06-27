package com.genweb2.emb.service;

import com.genweb2.emb.dto.CreateNewMessageInput;
import com.genweb2.emb.entity.ChatHistory;
import com.genweb2.emb.repository.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    private final ChatHistoryRepository chatHistoryRepository;

    @Override
    public void saveNewMessage(CreateNewMessageInput createNewMessageInput) {
        var chatHistory = ChatHistory.builder()
                                     .senderId(createNewMessageInput.senderId())
                                     .receiverId(createNewMessageInput.receiverId())
                                     .content(createNewMessageInput.content())
                                     .build();
        chatHistoryRepository.save(chatHistory);
        // Broadcast this message to rabbitmq
    }
}
