package com.oh_oh_peace.backend.mappers;

import org.mapstruct.Mapper;
import com.oh_oh_peace.backend.entities.Contribution;
import com.oh_oh_peace.backend.dtos.ContributionDTO;

@Mapper(componentModel = "spring")
public interface ContributionMapperMS {
    ContributionDTO toDto(Contribution c);
    Contribution toEntity(ContributionDTO dto);
}