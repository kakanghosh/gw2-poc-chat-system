package com.genweb2.emb.dto.request;

public record CreateNewMessageInput(Long senderId, Long receiverId, String content) {
}
