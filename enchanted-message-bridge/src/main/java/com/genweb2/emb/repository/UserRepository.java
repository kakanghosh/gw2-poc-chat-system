package com.genweb2.emb.repository;

import com.genweb2.emb.dto.service.UserDTO;
import com.genweb2.emb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("""
            SELECT new com.genweb2.emb.dto.service.UserDTO(u.id, u.firstName, u.lastName, u.onlineStatus)
            FROM User u
            JOIN UserKingdom uk ON uk.userId = u.id
            WHERE uk.kingdomId = :kingdomId
            ORDER BY u.firstName
            """)
    List<UserDTO> findUsersByKingdomId(@Param("kingdomId") Long kingdomId);
}
