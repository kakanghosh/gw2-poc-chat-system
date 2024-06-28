package com.genweb2.emb.controller;

import com.genweb2.emb.dto.request.FileTransferRequestInput;
import com.genweb2.emb.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/files")
public class FileTransferController {

    private final FileService fileService;

    @PostMapping("senders/{senderId}/receivers/{receiverId}")
    public ResponseEntity<?> transferFile(@PathVariable Long senderId,
                                          @PathVariable Long receiverId,
                                          @RequestParam("file") MultipartFile file) {
        fileService.transferFile(new FileTransferRequestInput(senderId, receiverId, file));
        return ResponseEntity.ok().build();
    }
}
