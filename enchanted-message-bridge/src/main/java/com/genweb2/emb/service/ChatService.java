package com.genweb2.emb.service;

import com.genweb2.emb.dto.request.CreateNewMessageInput;

public interface ChatService {
    void saveNewMessage(CreateNewMessageInput createNewMessageInput);
}
