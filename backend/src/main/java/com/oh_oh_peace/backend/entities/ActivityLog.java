package com.oh_oh_peace.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDateTime dateTime;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activityId")
    @JsonBackReference
    private Activity activity;
}
