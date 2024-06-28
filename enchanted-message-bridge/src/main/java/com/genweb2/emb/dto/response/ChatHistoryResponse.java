package com.genweb2.emb.dto.response;

import com.genweb2.emb.dto.service.ChatHistoryWithFileDTO;

import java.util.List;

public record ChatHistoryResponse(List<ChatHistoryWithFileDTO> histories,
                                  Integer pageNumber,
                                  Integer limit) {
}
