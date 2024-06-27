package com.genweb2.emb.repository;

import com.genweb2.emb.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}
