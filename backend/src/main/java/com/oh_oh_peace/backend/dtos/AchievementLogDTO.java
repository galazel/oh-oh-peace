package com.oh_oh_peace.backend.dtos;

import lombok.Data;

@Data
public class AchievementLogDTO {
    private long id;
    private Long achievementId;
    private Long userId;
}