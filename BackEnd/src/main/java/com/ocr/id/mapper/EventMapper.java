package com.ocr.id.mapper;

import org.springframework.stereotype.Component;

import com.ocr.id.dto.EventDto;
import com.ocr.id.model.Event;

@Component

public class EventMapper {
	
	
	public Event toEntity(EventDto dto)
	{
		Event event = new Event();
		event.setEventname(dto.getEventname());
		event.setEventdesc(dto.getEventdesc());
		event.setDate(dto.getDate());
		
		return event;
	}

}
