package com.genweb2.emb.service;

import com.genweb2.emb.dto.request.CreateNewMessageInput;
import com.genweb2.emb.dto.request.FileTransferRequestInput;
import com.genweb2.emb.dto.service.FileDTO;
import com.genweb2.emb.entity.FileEntity;
import com.genweb2.emb.event.FileTransferCompleteEvent;
import com.genweb2.emb.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
public class FileServiceImpl implements FileService {
    private final FileRepository fileRepository;
    private final ApplicationEventPublisher applicationEventPublisher;
    @Value("${file.upload-path}")
    private String fileUploadPath;

    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return "";
        }
        int dotPos = fileName.lastIndexOf('.');
        if (dotPos < 0 || dotPos == fileName.length() - 1) {
            return "";
        }
        return fileName.substring(dotPos + 1);
    }

    @Override
    public List<FileDTO> getFilesByIds(List<Long> fileIds) {
        return fileRepository.findAllById(fileIds)
                             .stream()
                             .map(file -> new FileDTO(file.getId(), file.getFileName(), file.getFilePath()))
                             .toList();
    }

    @Override
    public Optional<FileDTO> getFilesById(Long fileId) {
        if (Objects.isNull(fileId)) {
            return Optional.empty();
        }
        return fileRepository.findById(fileId)
                             .map(file -> new FileDTO(file.getId(), file.getFileName(), file.getFilePath()));
    }


    @Transactional
    @Override
    public void transferFile(FileTransferRequestInput fileTransferRequestInput) {
        try {
            var file = fileTransferRequestInput.file();
            String fileName = file.getOriginalFilename();
            var uniqueFileName = String.format("%s.%s", UUID.randomUUID(), getFileExtension(fileName));
            var filePath = fileUploadPath + uniqueFileName;
            file.transferTo(new File(filePath));
            var fileEntity = FileEntity.builder()
                                       .fileName(fileName)
                                       .filePath(filePath)
                                       .build();
            fileRepository.save(fileEntity);
            applicationEventPublisher.publishEvent(new FileTransferCompleteEvent(
                    new CreateNewMessageInput(
                            fileTransferRequestInput.senderId(),
                            fileTransferRequestInput.receiverId(),
                            null,
                            fileEntity.getId()
                    )
            ));
        } catch (IOException e) {
            log.error("failed to transfer file", e);
        }
    }

    @Override
    public Resource getFileResource(Long fileId) {
        var fileOptional = fileRepository.findById(fileId);
        if (fileOptional.isPresent()) {
            Path filePath = Paths.get(fileOptional.get().getFilePath());
            return new FileSystemResource(filePath.toFile());
        }
        return null;
    }
}
