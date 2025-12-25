package com.ocr.id.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ocr.id.dto.AttendanceDto;
import com.ocr.id.model.Attendance;
import com.ocr.id.service.AttendanceService;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    @PostMapping
    public Attendance markAttendance(
            @RequestBody AttendanceDto dto
    ) {
        return service.markAttendance(dto);
    }
    
    @GetMapping("/event/{eventId}")
    public List<Attendance> getAttendanceByEventId(
            @PathVariable Long eventId
    ) {
        return service.getAttendanceByEventId(eventId);
    }
}
