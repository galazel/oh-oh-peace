package com.oh_oh_peace.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.Duration;

@Entity
@Table(name = "problems")
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JoinColumn(name = "difficultyId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    private Difficulty difficulty;
    private String problemDescription;
    @JoinColumn(name = "categoryId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    private Category category;
    private Duration duration;

}
