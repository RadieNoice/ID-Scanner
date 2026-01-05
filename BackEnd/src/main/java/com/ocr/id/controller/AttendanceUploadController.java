package com.ocr.id.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ocr.id.dto.AttendanceUploadResponseDto;
import com.ocr.id.service.AttendanceUploadService;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceUploadController {

    private final AttendanceUploadService service;

    public AttendanceUploadController(AttendanceUploadService service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public ResponseEntity<AttendanceUploadResponseDto> uploadAttendance(
            @RequestParam Long eventId,
            @RequestParam MultipartFile file
    ) {
        AttendanceUploadResponseDto response =
                service.uploadAttendance(eventId, file);

        return ResponseEntity.ok(response);
    }
}
