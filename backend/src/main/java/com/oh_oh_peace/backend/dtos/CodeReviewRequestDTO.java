package com.oh_oh_peace.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class CodeReviewRequestDTO {
    private String code;
    private int languageId;
    private List<Long> testCasesId;
}
