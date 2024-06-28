package com.genweb2.emb.dto.service;

import java.time.LocalDateTime;

public record ChatHistoryWithFileDTO(Long id,
                                     Long senderId,
                                     Long receiverId,
                                     String content,
                                     FileDTO file,
                                     LocalDateTime createdAt) {
}
