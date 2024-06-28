package com.genweb2.emb.controller;

import com.genweb2.emb.dto.response.KingdomListResponse;
import com.genweb2.emb.service.KingdomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/kingdoms")
public class KingdomController {

    private final KingdomService kingdomService;

    @GetMapping("")
    public ResponseEntity<KingdomListResponse> getAllKingdoms() {
        return ResponseEntity.ok(
                new KingdomListResponse(kingdomService.getAll())
        );
    }
}
