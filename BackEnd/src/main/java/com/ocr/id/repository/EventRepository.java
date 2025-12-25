package com.ocr.id.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocr.id.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
