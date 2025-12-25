package com.ocr.id.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ocr.id.dto.AttendanceDto;
import com.ocr.id.mapper.AttendanceMapper;
import com.ocr.id.model.Attendance;
import com.ocr.id.model.Event;
import com.ocr.id.model.Members;
import com.ocr.id.repository.AttendanceRepository;
import com.ocr.id.repository.EventRepository;
import com.ocr.id.repository.MembersRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AttendanceService {

    private final AttendanceRepository attendanceRepo;
    private final EventRepository eventRepo;
    private final MembersRepository membersRepo;
    private final AttendanceMapper mapper;

    public AttendanceService(
            AttendanceRepository attendanceRepo,
            EventRepository eventRepo,
            MembersRepository membersRepo,
            AttendanceMapper mapper
    ) {
        this.attendanceRepo = attendanceRepo;
        this.eventRepo = eventRepo;
        this.membersRepo = membersRepo;
        this.mapper = mapper;
    }

    public Attendance markAttendance(AttendanceDto dto) {

        Event event = eventRepo.findById(dto.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Members member = membersRepo.findById(dto.getRegnum())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        attendanceRepo
            .findByEvent_IdAndMember_Regnum(dto.getEventId(), dto.getRegnum())
            .ifPresent(a -> {
                throw new RuntimeException("Attendance already marked");
            });

        Attendance attendance =
                mapper.toEntity(dto, event, member);

        return attendanceRepo.save(attendance);
    }
    
    public List<Attendance> getAttendanceByEventId(Long eventId) {

        eventRepo.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));

        return attendanceRepo.findByEvent_Id(eventId);
    }
}
