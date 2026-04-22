package com.oh_oh_peace.backend.tools;

import com.oh_oh_peace.backend.dtos.*;
import com.oh_oh_peace.backend.entities.TestCase;
import com.oh_oh_peace.backend.repos.TestCaseRepo;
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
    private final TestCaseRepo  testCaseRepo;

    @Tool("Submit the code to judge0 to execute and returns a token")
    public Mono<CodeSubmissionResponseDTO> submitCode(@P("source code") String sourceCode, @P("test case to test with the user's code")String testCase , @P("programming language") String language) {

        CodeSubmissionRequestDTO codeSubmissionRequestDTO = CodeSubmissionRequestDTO.builder()
                .sourceCode(sourceCode + testCase)
                .languageId(String.valueOf(language))
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

    @Tool("Get all test cases from the request")
    public List<TestCase> getAllTestCases(CodeReviewRequestDTO codeReviewRequestDTO){
        return testCaseRepo.findAllTestCasesById(codeReviewRequestDTO.getTestCasesId());
    }


}
