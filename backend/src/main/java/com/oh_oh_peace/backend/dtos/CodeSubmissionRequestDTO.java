package com.oh_oh_peace.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CodeSubmissionRequestDTO {

    @JsonProperty("source_code")
    private String sourceCode;

    @JsonProperty("language_id")
    private String languageId;

    private String stdin;

    @JsonProperty("expected_output")
    private String expectedOutput;

    @JsonProperty("number_of_runs")
    private Integer numberOfRuns;

    @JsonProperty("cpu_time_limit")
    private Float cpuTimeLimit;

    @JsonProperty("cpu_extra_time")
    private Float cpuExtraTime;

    @JsonProperty("wall_time_limit")
    private Float wallTimeLimit;

    @JsonProperty("memory_limit")
    private Integer memoryLimit;

    @JsonProperty("stack_limit")
    private Integer stackLimit;

    @JsonProperty("max_processes_and_or_threads")
    private Integer maxProcessesAndOrThreads;

    @JsonProperty("enable_per_process_and_thread_time_limit")
    private Boolean enablePerProcessAndThreadTimeLimit;

    @JsonProperty("enable_per_process_and_thread_memory_limit")
    private Boolean enablePerProcessAndThreadMemoryLimit;

    @JsonProperty("max_file_size")
    private Integer maxFileSize;

    @JsonProperty("enable_network")
    private Boolean enableNetwork;
}