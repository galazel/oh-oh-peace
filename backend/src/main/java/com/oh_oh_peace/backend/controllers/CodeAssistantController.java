package com.oh_oh_peace.backend.controllers;

import com.oh_oh_peace.backend.dtos.CodeReviewRequestDTO;
import com.oh_oh_peace.backend.dtos.CodeReviewResponseDTO;
import com.oh_oh_peace.backend.services.CodeService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/code-assistant/")
@RequiredArgsConstructor
public class CodeAssistantController {

    private final CodeService codeService;

    @PostMapping("submit")
    public ResponseEntity<CodeReviewResponseDTO> submitCode(@RequestBody CodeReviewRequestDTO codeReviewRequestDTO) {
        return new ResponseEntity<>(codeService.submitCode(codeReviewRequestDTO), HttpStatus.OK);
    }
    @PostMapping("ask")
    public String ask(@RequestParam("question") String question) {
        return codeService.ask(question);
    }

}
