package com.oh_oh_peace.backend.repos;

import com.oh_oh_peace.backend.entities.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepo extends JpaRepository<Problem, Long> {
    List<Problem> findByCategoryId(Long categoryId);
}
