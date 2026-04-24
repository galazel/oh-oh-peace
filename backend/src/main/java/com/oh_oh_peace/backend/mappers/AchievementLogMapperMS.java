package com.oh_oh_peace.backend.mappers;

import org.mapstruct.Mapper;
import com.oh_oh_peace.backend.entities.AchievementLog;
import com.oh_oh_peace.backend.dtos.AchievementLogDTO;

@Mapper(componentModel = "spring")
public interface AchievementLogMapperMS {
    AchievementLogDTO toDto(AchievementLog a);
    AchievementLog toEntity(AchievementLogDTO dto);
}