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

        if (attendanceRepo
            .findByEvent_IdAndMember_Regnum(dto.getEventId(), dto.getRegnum())
            .isPresent()) {
            return null;
        }

        Event event = eventRepo.findById(dto.getEventId()).orElseThrow();
        Members member = membersRepo.findById(dto.getRegnum()).orElseThrow();

        return attendanceRepo.save(mapper.toEntity(dto, event, member));
    }
    
    public List<Attendance> getAttendanceByEventId(Long eventId) {

        eventRepo.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));

        return attendanceRepo.findByEvent_Id(eventId);
    }
    
    public void deleteAttendance(Long attendanceId) {

        if (!attendanceRepo.existsById(attendanceId)) {
            throw new RuntimeException("Attendance not found");
        }

        attendanceRepo.deleteById(attendanceId);
    }
}
