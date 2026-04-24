package com.oh_oh_peace.backend.mappers;

import org.mapstruct.Mapper;
import com.oh_oh_peace.backend.entities.Problem;
import com.oh_oh_peace.backend.dtos.ProblemDTO;

@Mapper(componentModel = "spring")
public interface ProblemMapperMS {
    ProblemDTO toDto(Problem p);
    Problem toEntity(ProblemDTO dto);
}