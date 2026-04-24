package com.oh_oh_peace.backend.mappers;

import com.oh_oh_peace.backend.entities.ProblemSolved;
import com.oh_oh_peace.backend.dtos.ProblemSolvedDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProblemSolvedMapperMS {
    ProblemSolvedDTO toDto(ProblemSolved p);
    ProblemSolved toEntity(ProblemSolvedDTO dto);
}