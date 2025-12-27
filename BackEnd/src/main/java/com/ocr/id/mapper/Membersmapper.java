package com.ocr.id.mapper;
import org.springframework.stereotype.Component;

import com.ocr.id.dto.Membersdto;
import com.ocr.id.model.Members;

import jakarta.persistence.*;

@Component

public class Membersmapper {
	
	
	public Members toEntity(Membersdto mem)
	{
		Members member = new Members();
		member.setRegnum(mem.getRegnum());
		member.setName(mem.getName());
		member.setVit_email(mem.getVit_email());
		member.setCollege_department(mem.getCollege_department());
		member.setClub_dept(mem.getClub_dept());
		member.setMobile_no(mem.getMobile_no());
		member.setRole(mem.getRole());
		
		return member;
	}
	

}
