package com.oh_oh_peace.backend.repos;

import com.oh_oh_peace.backend.entities.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TestCaseRepo extends JpaRepository<TestCase, Long> {

    @Query(
            value = "SELECT * FROM test_cases ts WHERE ts.id IN (:testCasesId)",
            nativeQuery = true
    )
    List<TestCase> findAllTestCasesById(@Param("testCasesId") List<Long> testCasesId);
}
