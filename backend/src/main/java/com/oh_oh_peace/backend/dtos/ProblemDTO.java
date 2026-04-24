package com.oh_oh_peace.backend.dtos;

import lombok.Data;

@Data
public class ProblemDTO {
    private long id;
    private String problemTitle;
    private String problemDescription;
    private long duration;
    private Long difficultyId;
    private Long categoryId;
}
