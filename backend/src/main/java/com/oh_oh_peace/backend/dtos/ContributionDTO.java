package com.oh_oh_peace.backend.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class ContributionDTO {
    private long id;
    private Long userId;
    private Date date;
    private int noOfContributions;
}