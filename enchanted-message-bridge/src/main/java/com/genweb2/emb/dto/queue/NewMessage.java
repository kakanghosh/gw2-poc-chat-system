package com.genweb2.emb.dto.queue;

public record NewMessage(Long sender, Long receiver, String content) {
}
