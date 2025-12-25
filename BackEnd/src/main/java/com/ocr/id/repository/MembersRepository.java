package com.ocr.id.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocr.id.model.Members;

public interface MembersRepository extends JpaRepository<Members, String> {

}
