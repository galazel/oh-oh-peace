package com.oh_oh_peace.backend.services;

import io.awspring.cloud.s3.ObjectMetadata;
import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StorageService {

    private final S3Template s3Template;

    @Value("${aws.s3.bucket}")
    private String bucket;

    public String upload(String key, MultipartFile file) throws IOException {
        s3Template.upload(bucket, key, file.getInputStream(),
                ObjectMetadata.builder()
                        .contentType(file.getContentType())
                        .contentLength(file.getSize())
                        .build());
        return key;
    }

    public Resource download(String key) {
        return s3Template.download(bucket, key);
    }

    public URL presignedUrl(String key, Duration expiry) {
        return s3Template.createSignedGetURL(bucket, key, expiry);
    }

    public void delete(String key) {
        s3Template.deleteObject(bucket, key);
    }

    public List<S3Resource> listFiles(String prefix) {
        return s3Template.listObjects(bucket, prefix);
    }
}
