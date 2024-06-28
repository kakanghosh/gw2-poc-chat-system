package com.genweb2.emb.service;

import com.genweb2.emb.dto.service.KingdomDTO;
import com.genweb2.emb.repository.KingdomRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
@Slf4j
public class KingdomServiceImpl implements KingdomService {

    private final KingdomRepository kingdomRepository;

    @Override
    public List<KingdomDTO> getAll() {
        return kingdomRepository.findAll()
                                .stream()
                                .map(kingdom -> new KingdomDTO(kingdom.getId(), kingdom.getName()))
                                .toList();
    }
}
