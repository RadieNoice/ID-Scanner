package com.ocr.id.service;
import java.util.List;

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
	
	public List<Members> getMembers()
	{
		return repo.findAll();
	}
	
	public Members getMemberByRegnum(String regnum) {
	    return repo.findById(regnum)
	            .orElseThrow(() -> new RuntimeException("Member not found with regnum: " + regnum));
	}
	
	public Members updateMember(String regnum, Membersdto dto) {

	    Members existing = repo.findById(regnum)
	            .orElseThrow(() -> new RuntimeException("Member not found"));

	    existing.setName(dto.getName());
	    existing.setCollege_department(dto.getCollege_department());
	    existing.setVit_email(dto.getVit_email());
	    existing.setClub_dept(dto.getClub_dept());
	    existing.setMobile_no(dto.getMobile_no());
	    existing.setRole(dto.getRole());

	    return repo.save(existing); 
	}


	public void deleteMember(String regnum) {

	    if (!repo.existsById(regnum)) {
	        throw new RuntimeException("Member not found");
	    }

	    repo.deleteById(regnum);
	}
}
