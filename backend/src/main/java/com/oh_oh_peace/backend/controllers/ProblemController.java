package com.oh_oh_peace.backend.controllers;

import com.oh_oh_peace.backend.dtos.ProblemDTO;
import com.oh_oh_peace.backend.mappers.ProblemMapperMS;
import lombok.RequiredArgsConstructor;
import com.oh_oh_peace.backend.services.ProblemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/problems/")
@RequiredArgsConstructor
public class ProblemController {
    private final ProblemService problemService;
    private final ProblemMapperMS problemMapperMS;

    @GetMapping("all")
    public ResponseEntity<List<ProblemDTO>> getAll() {
        var problems = problemService.getAllProblems();
        var dtos = problems.stream().map(problemMapperMS::toDto).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

}
