package com.oh_oh_peace.backend.services;

import com.oh_oh_peace.backend.entities.Problem;
import com.oh_oh_peace.backend.repos.ProblemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemService {
    private final ProblemRepo  problemRepo;
    @Cacheable("problems")
    public List<Problem> getAllProblems() {
        return problemRepo.findAll();
    }
}
