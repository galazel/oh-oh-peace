package com.oh_oh_peace.backend.services;

import com.oh_oh_peace.backend.assistants.CodeAssistant;
import com.oh_oh_peace.backend.dtos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class CodeService {
    private final CodeAssistant  assistant;

    public CodeReviewResponseDTO submitCode(CodeReviewRequestDTO codeReviewRequestDTO) {
        return assistant.submitCode(codeReviewRequestDTO.getProblemId(),codeReviewRequestDTO.getProblemDescription(),codeReviewRequestDTO.getSourceCode(),codeReviewRequestDTO.getUserId(), codeReviewRequestDTO.getLanguageId());
    }
    public String ask(String question)
    {
        return assistant.ask(question);
    }

}
