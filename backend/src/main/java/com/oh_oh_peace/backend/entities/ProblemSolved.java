package com.oh_oh_peace.backend.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.Duration;

@Entity
@Table(name = "problems_solved")
public class ProblemSolved {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    private User user;
    private Duration duration;
    @JoinColumn(name = "problemId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    private Problem problem;
    private String solution;
}
