package com.genweb2.emb.configuration;

import org.springframework.amqp.core.AnonymousQueue;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.ExchangeBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfiguration {

    @Bean
    public Queue onlineStatusQueue() {
        return new AnonymousQueue();
    }

    @Bean
    public Queue messageContentQueue() {
        return new AnonymousQueue();
    }

    @Bean
    public FanoutExchange fanOutOnlineStatusExchange() {
        return ExchangeBuilder.fanoutExchange("emb.fanout.status")
                              .durable(true)
                              .build();
    }

    @Bean
    public FanoutExchange fanOutMessageContentExchange() {
        return ExchangeBuilder.fanoutExchange("emb.fanout.content")
                              .durable(true)
                              .build();
    }

    @Bean
    public Binding StatusQueueBinding(Queue onlineStatusQueue, FanoutExchange fanOutOnlineStatusExchange) {
        return BindingBuilder.bind(onlineStatusQueue).to(fanOutOnlineStatusExchange);
    }

    @Bean
    public Binding messageContentQueueBinding(Queue messageContentQueue, FanoutExchange fanOutMessageContentExchange) {
        return BindingBuilder.bind(messageContentQueue).to(fanOutMessageContentExchange);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
