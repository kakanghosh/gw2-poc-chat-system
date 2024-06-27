package com.genweb2.emb.repository;

import com.genweb2.emb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
