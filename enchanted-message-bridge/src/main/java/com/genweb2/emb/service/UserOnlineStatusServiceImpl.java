package com.genweb2.emb.service;

import com.genweb2.emb.dto.queue.UserOnlineStatus;
import com.genweb2.emb.dto.request.UserOnlineStatusUpdateInput;
import com.genweb2.emb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserOnlineStatusServiceImpl implements UserOnlineStatusService {

    private final UserRepository userRepository;
    private final FanoutExchange fanOutOnlineStatusExchange;
    private final RabbitTemplate rabbitTemplate;

    @Override
    public void updateUserOnlineStatus(UserOnlineStatusUpdateInput userOnlineStatusUpdateInput) {
        log.info("UserOnlineStatusUpdate: {}", userOnlineStatusUpdateInput);
        var optionalUser = userRepository.findById(userOnlineStatusUpdateInput.userId());
        if (optionalUser.isPresent()) {
            var user = optionalUser.get();
            user.setOnlineStatus(userOnlineStatusUpdateInput.onlineStatus());
            userRepository.save(user);
            rabbitTemplate.convertAndSend(
                    fanOutOnlineStatusExchange.getName(),
                    "", new UserOnlineStatus(user.getId(), user.getOnlineStatus())
            );
        }
    }
}
