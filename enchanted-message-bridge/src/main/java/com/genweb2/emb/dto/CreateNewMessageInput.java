package com.genweb2.emb.dto;

public record CreateNewMessageInput(Long senderId, Long receiverId, String content) {
}
