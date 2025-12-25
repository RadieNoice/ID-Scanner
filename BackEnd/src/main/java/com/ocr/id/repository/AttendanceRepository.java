package com.ocr.id.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocr.id.model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEvent_IdAndMember_Regnum(
            Long eventId,
            String regnum
    );
    
    List<Attendance> findByEvent_Id(Long eventId);
}
