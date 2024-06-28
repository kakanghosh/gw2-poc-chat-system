package com.genweb2.emb.service;

import com.genweb2.emb.dto.request.FileTransferRequestInput;
import com.genweb2.emb.dto.service.FileDTO;

import java.util.List;
import java.util.Optional;

public interface FileService {
    List<FileDTO> getFilesByIds(List<Long> fileIds);

    Optional<FileDTO> getFilesById(Long fileId);

    void transferFile(FileTransferRequestInput fileTransferRequestInput);
}
