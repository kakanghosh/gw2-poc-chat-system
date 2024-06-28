package com.genweb2.emb.dto.service;

import java.time.LocalDateTime;

public record ChatHistoryDTO(Long id,
                             Long senderId,
                             Long receiverId,
                             String content,
                             Long fileId,
                             LocalDateTime createdAt) {
}
