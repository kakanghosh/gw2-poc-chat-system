package com.genweb2.emb.controller;

import com.genweb2.emb.dto.request.FileTransferRequestInput;
import com.genweb2.emb.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    @GetMapping("{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) throws IOException {
        Resource file = fileService.getFileResource(fileId);
        if (file == null || !file.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                             .contentType(MediaType.APPLICATION_OCTET_STREAM)
                             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                             .body(file);
    }
}
