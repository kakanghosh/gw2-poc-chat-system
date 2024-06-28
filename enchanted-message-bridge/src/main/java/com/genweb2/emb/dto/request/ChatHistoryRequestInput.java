package com.genweb2.emb.dto.request;

public record ChatHistoryRequestInput(Long senderId,
                                      Long receiverId,
                                      Integer pageNumber,
                                      Integer limit) {
}
