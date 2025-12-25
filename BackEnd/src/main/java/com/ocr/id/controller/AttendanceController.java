package com.ocr.id.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> markAttendance(@RequestBody AttendanceDto dto) {

        Attendance attendance = service.markAttendance(dto);

        if (attendance == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Attendance already marked");
        }

        return ResponseEntity.ok("Attendance marked successfully");
    }

    
    @GetMapping("/event/{eventId}")
    public List<Attendance> getAttendanceByEventId(
            @PathVariable Long eventId
    ) {
        return service.getAttendanceByEventId(eventId);
    }
    
    @DeleteMapping("/{attendanceId}")
    public String deleteAttendance(@PathVariable Long attendanceId) {
        service.deleteAttendance(attendanceId);
        return "Attendance deleted successfully";
    }
}
