//package com.oh_oh_peace.backend.controllers;
//
//import com.oh_oh_peace.backend.services.StorageService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.core.io.Resource;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.net.URL;
//import java.time.Duration;
//import java.util.Map;
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/files")
//@RequiredArgsConstructor
//public class FileController {
//
//    private final StorageService storageService;
//
//
//    @GetMapping("hello")
//    public String hello() {
//        return "hello";
//    }
//
//    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Map<String, String>> upload(
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("email") String userEmail,
//            @RequestParam("folder") String folderName
//            ) throws IOException {
//
//        String key = folderName+"/" + userEmail + UUID.randomUUID() + "_" + file.getOriginalFilename();
//        storageService.upload(key, file);
//        return ResponseEntity.ok(Map.of("key", key));
//    }
//
//    @GetMapping("/{key}/url")
//    public ResponseEntity<Map<String, String>> presignedUrl(@PathVariable String key) {
//        URL url = storageService.presignedUrl(key, Duration.ofDays(1));
//        return ResponseEntity.ok(Map.of("url", url.toString()));
//    }
//
//    @GetMapping("/{key}")
//    public ResponseEntity<Resource> download(@PathVariable String key) {
//        Resource resource = storageService.download(key);
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + key + "\"")
//                .body(resource);
//    }
//
//    @DeleteMapping("/{key}")
//    public ResponseEntity<Void> delete(@PathVariable String key) {
//        storageService.delete(key);
//        return ResponseEntity.noContent().build();
//    }
//}
