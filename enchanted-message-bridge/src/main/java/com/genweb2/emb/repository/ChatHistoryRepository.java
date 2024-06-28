package com.genweb2.emb.repository;

import com.genweb2.emb.dto.service.ChatHistoryDTO;
import com.genweb2.emb.entity.ChatHistory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {

    @Query("""
            SELECT new com.genweb2.emb.dto.service.ChatHistoryDTO(ch.id, ch.senderId, ch.receiverId, ch.content, ch.fileId, ch.createdAt)
            FROM ChatHistory ch
            WHERE ch.senderId = :senderId AND ch.receiverId = :receiverId
            ORDER BY ch.createdAt DESC
            """)
    List<ChatHistoryDTO> findChatHistories(@Param("senderId") Long senderId,
                                           @Param("receiverId") Long receiverId,
                                           PageRequest pageRequest);
}
