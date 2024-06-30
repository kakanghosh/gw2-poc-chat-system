package com.genweb2.emb.dto.queue;

import com.genweb2.emb.dto.service.FileDTO;

import java.time.LocalDateTime;

public record NewMessage(Long id,
                         Long senderId,
                         Long receiverId,
                         String content,
                         FileDTO file,
                         LocalDateTime createdAt) {
}
