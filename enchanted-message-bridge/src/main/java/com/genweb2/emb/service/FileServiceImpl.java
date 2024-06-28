package com.genweb2.emb.service;

import com.genweb2.emb.dto.service.FileDTO;
import com.genweb2.emb.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;

    @Override
    public List<FileDTO> getFilesByIds(List<Long> fileIds) {
        return fileRepository.findAllById(fileIds)
                             .stream()
                             .map(file -> new FileDTO(file.getId(), file.getFileName(), file.getFilePath()))
                             .toList();
    }
}
