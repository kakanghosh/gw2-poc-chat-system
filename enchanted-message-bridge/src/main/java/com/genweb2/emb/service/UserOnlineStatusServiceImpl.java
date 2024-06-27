package com.genweb2.emb.service;

import com.genweb2.emb.dto.UserOnlineStatusUpdateInput;
import com.genweb2.emb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserOnlineStatusServiceImpl implements UserOnlineStatusService {

    private final UserRepository userRepository;

    @Override
    public void updateUserOnlineStatus(UserOnlineStatusUpdateInput userOnlineStatusUpdateInput) {
        var optionalUser = userRepository.findById(userOnlineStatusUpdateInput.userId());
        if (optionalUser.isPresent()) {
            optionalUser.get().setOnlineStatus(userOnlineStatusUpdateInput.onlineStatus());
            userRepository.save(optionalUser.get());
            // Broadcast online status to RabbitMQ
        }
    }
}
