package com.oh_oh_peace.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class CodeReviewResponseDTO {
    private List<TestCaseResponseDTO> testCaseResponseDTOList;
    private String aiExplanation;
}
