package com.oh_oh_peace.backend.dtos;

import lombok.Data;

@Data
public class UserDTO {
    private long id;
    private String username;
    private String email;
    private String bio;
    private String s3BucketKeyProfile;
}