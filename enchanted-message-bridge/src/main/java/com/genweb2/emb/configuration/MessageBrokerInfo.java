package com.genweb2.emb.configuration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MessageBrokerInfo {
    SIMPLE_BROKER("emb-topic"),
    ;

    private final String name;
}
