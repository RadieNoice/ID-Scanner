package com.ocr.id.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ocr.id.dto.EventDto;
import com.ocr.id.mapper.EventMapper;
import com.ocr.id.model.Event;
import com.ocr.id.repository.EventRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional

public class EventService {
	
	private final EventMapper mapper;
	private final EventRepository repo;
	
	public EventService(EventMapper mapper,EventRepository repo)
	{
		this.mapper = mapper;
		this.repo=repo;
	}
	
	public Event saveEvent(EventDto dto)
	{
		return repo.save(mapper.toEntity(dto));
	}
	
	
	public List<Event> getEvent()
	{
		return repo.findAll();
	}
	
	public void deleteEvent(Long eventId) {

	    if (!repo.existsById(eventId)) {
	        throw new RuntimeException("Event not found");
	    }

	    repo.deleteById(eventId);
	}

}
