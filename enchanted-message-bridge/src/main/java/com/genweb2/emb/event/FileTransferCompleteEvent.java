package com.genweb2.emb.event;

import org.springframework.context.ApplicationEvent;

public class FileTransferCompleteEvent extends ApplicationEvent {

    public FileTransferCompleteEvent(Object source) {
        super(source);
    }
}
