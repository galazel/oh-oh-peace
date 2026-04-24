package com.oh_oh_peace.backend.mappers;

import org.mapstruct.Mapper;
import com.oh_oh_peace.backend.entities.Activity;
import com.oh_oh_peace.backend.dtos.ActivityDTO;

@Mapper(componentModel = "spring")
public interface ActivityMapperMS {
    ActivityDTO toDto(Activity a);
    Activity toEntity(ActivityDTO dto);
}