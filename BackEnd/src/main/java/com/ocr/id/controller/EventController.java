package com.ocr.id.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocr.id.dto.EventDto;
import com.ocr.id.model.Event;
import com.ocr.id.service.EventService;

@RestController
@RequestMapping("/api/event")
public class EventController {
	
	private final EventService ser;
	
	public EventController(EventService ser)
	{
		this.ser=ser;
	}
	
	@PostMapping
	public Event saveEvent(@RequestBody EventDto dto)
	{
		return ser.saveEvent(dto);
	}
	
	@GetMapping
	public List<Event> getEvent()
	{
		return ser.getEvent();
	}

}
