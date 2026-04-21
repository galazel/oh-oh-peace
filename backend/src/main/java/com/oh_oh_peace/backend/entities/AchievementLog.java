package com.oh_oh_peace.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "achievement-logs")
public class AchievementLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JoinColumn(name = "achievementId")
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    private Achievement achievement;
    @JoinColumn(name = "userId")
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    private User user;
}
