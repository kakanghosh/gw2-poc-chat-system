package com.genweb2.emb.dto.response;

import com.genweb2.emb.dto.service.UserDTO;

import java.util.List;

public record UserListResponse(List<UserDTO> users) {
}
