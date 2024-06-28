package com.genweb2.emb.service;

import com.genweb2.emb.dto.service.UserDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUserByKingdomId(Long kingdomId);
}
