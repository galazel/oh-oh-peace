package com.oh_oh_peace.backend.controllers;

import com.oh_oh_peace.backend.dtos.CategoryWithProblemsDTO;
import com.oh_oh_peace.backend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<List<CategoryWithProblemsDTO>> getAll() {
        return ResponseEntity.ok(categoryService.getAllCategoriesWithProblems());
    }
}
