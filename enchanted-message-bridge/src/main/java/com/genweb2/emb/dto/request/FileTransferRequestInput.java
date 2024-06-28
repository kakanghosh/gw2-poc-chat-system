package com.genweb2.emb.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record FileTransferRequestInput(
        Long senderId,
        Long receiverId,
        MultipartFile file) {
}
