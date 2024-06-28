package com.genweb2.emb.service;

import com.genweb2.emb.dto.service.FileDTO;

import java.util.List;

public interface FileService {
    List<FileDTO> getFilesByIds(List<Long> fileIds);
}
