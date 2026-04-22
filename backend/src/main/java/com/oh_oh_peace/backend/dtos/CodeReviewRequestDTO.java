package com.oh_oh_peace.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class CodeReviewRequestDTO {
    private long userId;
    private long problemId;
    private String problemDescription;
    private String sourceCode;
    private String languageId;
}
