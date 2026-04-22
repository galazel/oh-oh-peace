package com.oh_oh_peace.backend.configs;

import dev.langchain4j.memory.chat.ChatMemoryProvider;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AssistantConfig {
    @Value("${langchain4j.open-ai.api-key}")
    private String apiKey;
    @Value("${langchain4j.open-ai.base-url}")
    private String baseUrl;
    @Value("${langchain4j.open-ai.chat-model.model-name}")
    private String chatModelName;
    @Value("${langchain4j.open-ai.chat-model.temperature}")
    private double temperature;

    @Bean
    public ChatMemoryProvider chatMemoryProvider() {
        return memoryId -> MessageWindowChatMemory.builder()
                .id(memoryId)
                .maxMessages(200)
                .build();
    }

    @Bean
    public ChatLanguageModel chatLanguageModel() {
        return OpenAiChatModel.builder()
                .apiKey(apiKey)
                .baseUrl(baseUrl)
                .modelName(chatModelName)
                .temperature(temperature)
                .build();
    }
}
