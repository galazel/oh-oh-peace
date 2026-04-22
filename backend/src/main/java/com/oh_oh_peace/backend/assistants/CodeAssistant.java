package com.oh_oh_peace.backend.assistants;

import com.oh_oh_peace.backend.dtos.CodeReviewRequestDTO;
import com.oh_oh_peace.backend.dtos.CodeReviewResponseDTO;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.spring.AiService;
import reactor.core.publisher.Mono;

@AiService
public interface CodeAssistant {
    @SystemMessage("You are a code evaluator, your role is to check and return a response whether the source code submitted by the user is correct for every test cases.")
    CodeReviewResponseDTO submitCode(CodeReviewRequestDTO codeReviewRequestDTO);
}
