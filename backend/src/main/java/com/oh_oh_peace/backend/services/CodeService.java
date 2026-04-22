package com.oh_oh_peace.backend.services;

import com.oh_oh_peace.backend.dtos.CodeOutputResponseDTO;
import com.oh_oh_peace.backend.dtos.CodeSubmissionRequestDTO;
import com.oh_oh_peace.backend.dtos.CodeSubmissionResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Service
@RequiredArgsConstructor
public class CodeService {

    private final WebClient webClient;

    public Mono<CodeSubmissionResponseDTO> submitCode(CodeSubmissionRequestDTO codeSubmission) {
        return webClient.post()
                .uri("submissions")
                .bodyValue(codeSubmission)
                .retrieve()
                .bodyToMono(CodeSubmissionResponseDTO.class);
    }
    public Mono<CodeOutputResponseDTO> getOutputCode(String token){
        return webClient.get()
                .uri("submissions/{token}",token)
                .retrieve()
                .bodyToMono(CodeOutputResponseDTO.class);
    }

}
