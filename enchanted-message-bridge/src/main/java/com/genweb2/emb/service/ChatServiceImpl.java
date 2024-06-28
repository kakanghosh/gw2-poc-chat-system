package com.genweb2.emb.service;

import com.genweb2.emb.dto.queue.NewMessage;
import com.genweb2.emb.dto.request.ChatHistoryRequestInput;
import com.genweb2.emb.dto.request.CreateNewMessageInput;
import com.genweb2.emb.dto.service.ChatHistoryDTO;
import com.genweb2.emb.dto.service.ChatHistoryWithFileDTO;
import com.genweb2.emb.dto.service.FileDTO;
import com.genweb2.emb.entity.ChatHistory;
import com.genweb2.emb.event.FileTransferCompleteEvent;
import com.genweb2.emb.exception.InvalidLimitException;
import com.genweb2.emb.exception.InvalidPageNumberException;
import com.genweb2.emb.repository.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    private final ChatHistoryRepository chatHistoryRepository;
    private final FanoutExchange fanOutMessageContentExchange;
    private final RabbitTemplate rabbitTemplate;
    private final FileService fileService;

    @Transactional
    @Override
    public void saveNewMessage(CreateNewMessageInput createNewMessageInput) {
        var chatHistory = ChatHistory.builder()
                                     .senderId(createNewMessageInput.senderId())
                                     .receiverId(createNewMessageInput.receiverId())
                                     .content(createNewMessageInput.content())
                                     .fileId(createNewMessageInput.fileId())
                                     .build();
        chatHistoryRepository.save(chatHistory);
        var fileDto = fileService.getFilesById(chatHistory.getFileId()).orElse(null);
        rabbitTemplate.convertAndSend(
                fanOutMessageContentExchange.getName(),
                "",
                new NewMessage(
                        chatHistory.getSenderId(),
                        chatHistory.getReceiverId(),
                        chatHistory.getContent(),
                        fileDto,
                        chatHistory.getCreatedAt()
                )
        );
    }

    @Override
    public List<ChatHistoryWithFileDTO> getChatHistories(ChatHistoryRequestInput chatHistoryRequestInput) {
        validateInput(chatHistoryRequestInput);
        var pageRequest = PageRequest.of(chatHistoryRequestInput.pageNumber(), chatHistoryRequestInput.limit());
        var histories = chatHistoryRepository.findChatHistories(
                chatHistoryRequestInput.senderId(),
                chatHistoryRequestInput.receiverId(),
                pageRequest
        );
        var availableFileIds = histories.stream()
                                        .map(ChatHistoryDTO::fileId)
                                        .filter(Objects::nonNull)
                                        .toList();
        var fileIdMap = fileService.getFilesByIds(availableFileIds)
                                   .stream()
                                   .collect(Collectors.toMap(FileDTO::id, Function.identity()));
        return histories.stream()
                        .map(history -> {
                            var fileDto = Optional.ofNullable(fileIdMap.get(history.fileId()))
                                                  .map(f -> new FileDTO(f.id(), f.fileName(), f.filePath()))
                                                  .orElse(null);
                            return new ChatHistoryWithFileDTO(
                                    history.id(),
                                    history.senderId(),
                                    history.receiverId(),
                                    history.content(),
                                    fileDto,
                                    history.createdAt()
                            );
                        }).toList();
    }

    private void validateInput(ChatHistoryRequestInput chatHistoryRequestInput) {
        if (chatHistoryRequestInput.pageNumber() < 0) {
            throw new InvalidPageNumberException("page number: " + chatHistoryRequestInput.pageNumber());
        }
        if (chatHistoryRequestInput.limit() < 1) {
            throw new InvalidLimitException("limit: " + chatHistoryRequestInput.limit());
        }
    }

    @EventListener
    public void onFileTransferComplete(FileTransferCompleteEvent event) {
        if (event.getSource() instanceof CreateNewMessageInput input) {
            saveNewMessage(input);
        }
    }
}
