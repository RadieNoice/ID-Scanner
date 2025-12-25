package com.ocr.id.service;
import org.springframework.stereotype.Service;

import com.ocr.id.dto.Membersdto;
import com.ocr.id.mapper.Membersmapper;
import com.ocr.id.model.Members;
import com.ocr.id.repository.MembersRepository;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class MemberService {

	private final Membersmapper mapper;
	private final MembersRepository repo;
	
	public MemberService(Membersmapper mapper,MembersRepository repo)
	{
		this.mapper=mapper;
		this.repo=repo;
	}
	
	
	public Members saveMember(Membersdto mem)
	{
		return repo.save(mapper.toEntity(mem));
	}
}
