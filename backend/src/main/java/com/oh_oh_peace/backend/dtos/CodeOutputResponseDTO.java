package com.oh_oh_peace.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CodeOutputResponseDTO {

    private String stdout;
    private String time;
    private Integer memory;
    private String stderr;

    private String token;

    @JsonProperty("compile_output")
    private String compileOutput;

    private String message;

    private Status status;

    @Data
    public static class Status {
        private Integer id;
        private String description;
    }
}