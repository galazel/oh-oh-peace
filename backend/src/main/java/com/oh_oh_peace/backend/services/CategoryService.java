package com.oh_oh_peace.backend.services;

import com.oh_oh_peace.backend.dtos.CategoryWithProblemsDTO;
import com.oh_oh_peace.backend.dtos.ProblemDTO;
import com.oh_oh_peace.backend.entities.Category;
import com.oh_oh_peace.backend.mappers.ProblemMapperMS;
import com.oh_oh_peace.backend.repos.CategoryRepo;
import com.oh_oh_peace.backend.repos.ProblemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepo categoryRepo;
    private final ProblemRepo problemRepo;
    private final ProblemMapperMS problemMapperMS;

    @Cacheable("categories")
    public List<CategoryWithProblemsDTO> getAllCategoriesWithProblems() {
        List<Category> categories = categoryRepo.findAll();
        return categories.stream().map(cat -> {
            CategoryWithProblemsDTO dto = new CategoryWithProblemsDTO();
            dto.setId(cat.getId());
            dto.setCategoryDescription(cat.getCategoryDescription());
            List<ProblemDTO> problemDTOs = problemRepo.findByCategoryId(cat.getId())
                    .stream().map(problemMapperMS::toDto).collect(Collectors.toList());
            dto.setProblems(problemDTOs);
            return dto;
        }).collect(Collectors.toList());
    }
}
