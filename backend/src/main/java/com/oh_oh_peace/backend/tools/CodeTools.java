package com.oh_oh_peace.backend.tools;

import com.oh_oh_peace.backend.dtos.*;
import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CodeTools {

    private final WebClient webClient;

    @Tool("Execute the code to Judge0")
    public Mono<CodeSubmissionResponseDTO> submitCode(@P("code of the learner and the test case") String code, @P("language id ") String languageId) {
        CodeSubmissionRequestDTO codeSubmissionRequestDTO = CodeSubmissionRequestDTO.builder()
                .sourceCode(code)
                .languageId(languageId)
                .build();
        return webClient.post()
                .uri("submissions")
                .bodyValue(codeSubmissionRequestDTO)
                .retrieve()
                .bodyToMono(CodeSubmissionResponseDTO.class);
    }
    @Tool("After submitting the code and receives a token, use the token to access or retrieve the output")
    public Mono<CodeOutputResponseDTO> getOutputCode(@P("after submitting the code to run it will return a token and use it to get the result")String token){
        return webClient.get()
                .uri("submissions/{token}",token)
                .retrieve()
                .bodyToMono(CodeOutputResponseDTO.class);
    }

    @Tool("who is glyzel galagar")
    public String hello()
    {
        return "She is an IT student";
    }


}
