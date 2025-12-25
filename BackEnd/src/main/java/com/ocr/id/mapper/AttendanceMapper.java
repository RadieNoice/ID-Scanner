package com.ocr.id.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.ocr.id.dto.AttendanceDto;
import com.ocr.id.model.Attendance;
import com.ocr.id.model.Event;
import com.ocr.id.model.Members;

@Component
public class AttendanceMapper {

    public Attendance toEntity(
            AttendanceDto dto,
            Event event,
            Members member
    ) {
        Attendance attendance = new Attendance(); // ✅ NEW object
        attendance.setEvent(event);
        attendance.setMember(member);
        attendance.setPresent(dto.getPresent());
        attendance.setMarkedAt(LocalDateTime.now());
        return attendance;
    }
}
