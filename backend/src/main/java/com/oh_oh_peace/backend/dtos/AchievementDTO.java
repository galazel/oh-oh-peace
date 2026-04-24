package com.oh_oh_peace.backend.dtos;

import lombok.Data;

@Data
public class AchievementDTO {
    private long id;
    private String achievementDescription;
    private String s3BucketKey;
}