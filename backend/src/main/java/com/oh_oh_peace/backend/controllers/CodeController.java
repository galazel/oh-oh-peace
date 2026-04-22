//package com.oh_oh_peace.backend.controllers;
//
//import com.oh_oh_peace.backend.dtos.CodeOutputResponseDTO;
//import com.oh_oh_peace.backend.dtos.CodeSubmissionRequestDTO;
//import com.oh_oh_peace.backend.dtos.CodeSubmissionResponseDTO;
//import com.oh_oh_peace.backend.services.CodeService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//import reactor.core.publisher.Mono;
//
//@RestController
//@RequestMapping("api/v1/code")
//@RequiredArgsConstructor
//public class CodeController {
//
//    private final CodeService codeService;
//
//    @PostMapping("submit")
//    @ResponseStatus(HttpStatus.OK)
//    public Mono<CodeSubmissionResponseDTO> submitCode(@RequestBody CodeSubmissionRequestDTO codeSubmission){
//        return codeService.submitCode(codeSubmission);
//    }
//    @GetMapping("output")
//    @ResponseStatus(HttpStatus.OK)
//    public Mono<CodeOutputResponseDTO> outputCode(@RequestParam("token") String token){
//        return codeService.getOutputCode(token);
//    }
//}
