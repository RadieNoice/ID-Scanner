package com.ocr.id.service;

import java.io.InputStream;
import java.util.*;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ocr.id.dto.AttendanceUploadResponseDto;
import com.ocr.id.model.Attendance;
import com.ocr.id.model.Event;
import com.ocr.id.model.Members;
import com.ocr.id.repository.AttendanceRepository;
import com.ocr.id.repository.EventRepository;
import com.ocr.id.repository.MembersRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AttendanceUploadService {

    private final AttendanceRepository attendanceRepo;
    private final EventRepository eventRepo;
    private final MembersRepository membersRepo;

    public AttendanceUploadService(
            AttendanceRepository attendanceRepo,
            EventRepository eventRepo,
            MembersRepository membersRepo
    ) {
        this.attendanceRepo = attendanceRepo;
        this.eventRepo = eventRepo;
        this.membersRepo = membersRepo;
    }

    public AttendanceUploadResponseDto uploadAttendance(
            Long eventId,
            MultipartFile file
    ) {

        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        int totalRows = 0;
        int marked = 0;
        int alreadyMarked = 0;
        List<String> invalidRegnums = new ArrayList<>();

        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) { // skip header
                Row row = sheet.getRow(i);
                if (row == null) continue;

                Cell cell = row.getCell(0);
                if (cell == null) continue;

                String regnum = cell.getStringCellValue().trim();
                totalRows++;

                Optional<Members> memberOpt =
                        membersRepo.findById(regnum);

                if (memberOpt.isEmpty()) {
                    invalidRegnums.add(regnum);
                    continue;
                }

                boolean exists =
                        attendanceRepo
                            .findByEvent_IdAndMember_Regnum(eventId, regnum)
                            .isPresent();

                if (exists) {
                    alreadyMarked++;
                    continue;
                }

                Attendance attendance = new Attendance();
                attendance.setEvent(event);
                attendance.setMember(memberOpt.get());
                attendance.setPresent(true);
                attendance.setMarkedAt(java.time.LocalDateTime.now());

                attendanceRepo.save(attendance);
                marked++;
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to process Excel file", e);
        }

        return new AttendanceUploadResponseDto(
                eventId,
                totalRows,
                marked,
                alreadyMarked,
                invalidRegnums
        );
    }
}
