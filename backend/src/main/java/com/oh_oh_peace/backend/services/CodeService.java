package com.oh_oh_peace.backend.services;

import com.oh_oh_peace.backend.assistants.CodeAssistant;
import com.oh_oh_peace.backend.dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


@Service
@RequiredArgsConstructor
public class CodeService {
    private final CodeAssistant  assistant;

    public CodeReviewResponseDTO submitCode(CodeReviewRequestDTO codeReviewRequestDTO) {
        return assistant.submitCode(codeReviewRequestDTO);
    }
}
