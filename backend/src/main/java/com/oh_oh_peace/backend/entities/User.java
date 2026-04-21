package com.oh_oh_peace.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String email;
    private String bio;
    private String s3BucketKeyProfile;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "user")
    private Set<AchievementLog> achievementLogSet;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL)
    private Set<ProblemSolved> problemSolvedSet;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Contribution> contributionSet;
}
