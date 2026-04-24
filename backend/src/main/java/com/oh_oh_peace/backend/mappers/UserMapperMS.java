package com.oh_oh_peace.backend.mappers;

import org.mapstruct.Mapper;
import com.oh_oh_peace.backend.entities.User;
import com.oh_oh_peace.backend.dtos.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapperMS {
    UserDTO toDto(User u);
    User toEntity(UserDTO dto);
}