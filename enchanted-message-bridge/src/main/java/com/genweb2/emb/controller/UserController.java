package com.genweb2.emb.controller;

import com.genweb2.emb.dto.response.UserListResponse;
import com.genweb2.emb.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @GetMapping("kingdoms/{kingdomId}")
    public ResponseEntity<UserListResponse> getAllUsersByKingdom(@PathVariable Long kingdomId) {
        return ResponseEntity.ok(
                new UserListResponse(userService.getAllUserByKingdomId(kingdomId))
        );
    }
}
