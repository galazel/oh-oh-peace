package com.oh_oh_peace.backend.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityLogDTO {
    private long id;
    private LocalDateTime dateTime;
    private Long activityId;
}