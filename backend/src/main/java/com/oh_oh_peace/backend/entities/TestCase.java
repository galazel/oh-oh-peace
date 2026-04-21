package com.oh_oh_peace.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "test-cases")
public class TestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JoinColumn(name = "problemId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    private Problem problem;
    private String expectedOutput;
}
