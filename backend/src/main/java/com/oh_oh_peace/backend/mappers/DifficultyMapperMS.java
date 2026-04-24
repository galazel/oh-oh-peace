package com.oh_oh_peace.backend.mappers;

import org.mapstruct.Mapper;
import com.oh_oh_peace.backend.entities.Difficulty;
import com.oh_oh_peace.backend.dtos.DifficultyDTO;

@Mapper(componentModel = "spring")
public interface DifficultyMapperMS {
    DifficultyDTO toDto(Difficulty d);
    Difficulty toEntity(DifficultyDTO dto);
}