package com.oh_oh_peace.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class ConfigClass {

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
   @Bean
    public WebClient webClient() {
       return webClientBuilder()
               .baseUrl("https://ce.judge0.com/")
               .build();
   }
}
