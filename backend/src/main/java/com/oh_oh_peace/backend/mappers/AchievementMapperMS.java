package com.oh_oh_peace.backend.mappers;

import org.mapstruct.Mapper;
import com.oh_oh_peace.backend.entities.Achievement;
import com.oh_oh_peace.backend.dtos.AchievementDTO;

@Mapper(componentModel = "spring")
public interface AchievementMapperMS {
    AchievementDTO toDto(Achievement a);
    Achievement toEntity(AchievementDTO dto);
}