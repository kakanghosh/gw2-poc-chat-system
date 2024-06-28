package com.genweb2.emb.service;

import com.genweb2.emb.dto.request.ChatHistoryRequestInput;
import com.genweb2.emb.dto.service.ChatHistoryWithFileDTO;

import java.util.List;

public interface ChatHistoryService {
    List<ChatHistoryWithFileDTO> getChatHistories(ChatHistoryRequestInput chatHistoryRequestInput);
}
