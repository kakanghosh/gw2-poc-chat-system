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
            WHERE (ch.senderId = :user1Id AND ch.receiverId = :user2Id) OR
            (ch.senderId = :user2Id AND ch.receiverId = :user1Id)
            ORDER BY ch.createdAt DESC
            """)
    List<ChatHistoryDTO> findChatHistories(@Param("user1Id") Long user1Id,
                                           @Param("user2Id") Long user2Id,
                                           PageRequest pageRequest);

    @Query("""
            SELECT COUNT(ch)
            FROM ChatHistory ch
            WHERE (ch.senderId = :user1Id AND ch.receiverId = :user2Id) OR
            (ch.senderId = :user2Id AND ch.receiverId = :user1Id)
            """)
    Long countChatHistories(@Param("user1Id") Long user1Id,
                            @Param("user2Id") Long user2Id);
}
