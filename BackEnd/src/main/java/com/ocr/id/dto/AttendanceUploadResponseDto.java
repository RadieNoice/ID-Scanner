package com.ocr.id.dto;

import java.util.List;

public class AttendanceUploadResponseDto {

    private Long eventId;
    private int totalRows;
    private int marked;
    private int alreadyMarked;
    private List<String> invalidRegnums;

    public AttendanceUploadResponseDto(
            Long eventId,
            int totalRows,
            int marked,
            int alreadyMarked,
            List<String> invalidRegnums
    ) {
        this.eventId = eventId;
        this.totalRows = totalRows;
        this.marked = marked;
        this.alreadyMarked = alreadyMarked;
        this.invalidRegnums = invalidRegnums;
    }

    public Long getEventId() { return eventId; }
    public int getTotalRows() { return totalRows; }
    public int getMarked() { return marked; }
    public int getAlreadyMarked() { return alreadyMarked; }
    public List<String> getInvalidRegnums() { return invalidRegnums; }
}
