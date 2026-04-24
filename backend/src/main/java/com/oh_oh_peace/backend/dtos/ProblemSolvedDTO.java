package com.oh_oh_peace.backend.dtos;

import lombok.Data;

@Data
public class ProblemSolvedDTO {
    private long id;
    private Long userId;
    private Long problemId;
    private Long duration;
    private String solution;
}