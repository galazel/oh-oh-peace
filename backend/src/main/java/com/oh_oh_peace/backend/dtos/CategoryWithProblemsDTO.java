package com.oh_oh_peace.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class CategoryWithProblemsDTO {
    private long id;
    private String categoryDescription;
    private List<ProblemDTO> problems;
}
