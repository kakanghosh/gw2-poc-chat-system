package com.genweb2.emb.service;

import com.genweb2.emb.dto.service.UserDTO;
import com.genweb2.emb.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserDTO> getAllUserByKingdomId(Long kingdomId) {
        return userRepository.findUsersByKingdomId(kingdomId);
    }
}
