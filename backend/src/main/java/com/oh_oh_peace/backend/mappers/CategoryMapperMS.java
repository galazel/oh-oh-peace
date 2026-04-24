package com.oh_oh_peace.backend.mappers;

import org.mapstruct.Mapper;
import com.oh_oh_peace.backend.entities.Category;
import com.oh_oh_peace.backend.dtos.CategoryDTO;

@Mapper(componentModel = "spring")
public interface CategoryMapperMS {
    CategoryDTO toDto(Category c);
    Category toEntity(CategoryDTO dto);
}