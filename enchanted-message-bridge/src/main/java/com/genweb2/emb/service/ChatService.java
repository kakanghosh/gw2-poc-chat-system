package com.genweb2.emb.service;

import com.genweb2.emb.dto.request.ChatHistoryRequestInput;
import com.genweb2.emb.dto.request.CreateNewMessageInput;
import com.genweb2.emb.dto.service.ChatHistoryWithFileDTO;

import java.util.List;

public interface ChatService {
    void saveNewMessage(CreateNewMessageInput createNewMessageInput);

    List<ChatHistoryWithFileDTO> getChatHistories(ChatHistoryRequestInput chatHistoryRequestInput);
}
