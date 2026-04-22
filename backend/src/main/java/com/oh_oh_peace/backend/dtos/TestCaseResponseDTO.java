package com.oh_oh_peace.backend.dtos;

import lombok.Data;

@Data
public class TestCaseResponseDTO {
    private String testCase;
    private Object predefinedState;
    private Object input;
    private Object expectedOutput;
    private Object actualOutput;
    private String status;
}