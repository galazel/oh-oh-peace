package com.oh_oh_peace.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class CodeReviewResponseDTO {
    List<TestCaseResponseDTO> testCaseDTOList;
    private String aiMessage;
}
