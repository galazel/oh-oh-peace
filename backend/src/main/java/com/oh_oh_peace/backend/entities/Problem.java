package com.oh_oh_peace.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@Entity
@Table(name = "problems")
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(name = "problemTitle")
    private String problemTitle;

    @Column(columnDefinition = "LONGTEXT", name = "problemDescription")
    private String problemDescription;

    @Column(name = "duration")
    private long duration;

    @Column(name = "difficultyId")
    private Long difficultyId;

    @Column(name = "categoryId")
    private Long categoryId;

}
