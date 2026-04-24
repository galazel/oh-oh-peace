package com.oh_oh_peace.backend.mappers;

import org.mapstruct.Mapper;
import com.oh_oh_peace.backend.entities.ActivityLog;
import com.oh_oh_peace.backend.dtos.ActivityLogDTO;

@Mapper(componentModel = "spring")
public interface ActivityLogMapperMS {
    ActivityLogDTO toDto(ActivityLog a);
    ActivityLog toEntity(ActivityLogDTO dto);
}