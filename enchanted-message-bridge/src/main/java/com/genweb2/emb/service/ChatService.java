package com.genweb2.emb.service;

import com.genweb2.emb.dto.request.ChatHistoryRequestInput;
import com.genweb2.emb.dto.request.CreateNewMessageInput;
import com.genweb2.emb.dto.response.ChatHistoryResponse;

public interface ChatService {
    void saveNewMessage(CreateNewMessageInput createNewMessageInput);

    ChatHistoryResponse getChatHistories(ChatHistoryRequestInput chatHistoryRequestInput);
}
