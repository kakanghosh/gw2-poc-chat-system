package com.genweb2.emb.dto.response;

import com.genweb2.emb.dto.service.KingdomDTO;

import java.util.List;

public record KingdomListResponse(List<KingdomDTO> kingdoms) {
}
