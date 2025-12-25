package com.ocr.id.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocr.id.dto.Membersdto;
import com.ocr.id.model.Members;
import com.ocr.id.service.MemberService;

import jakarta.persistence.*;

@RestController
@RequestMapping("/api/setmember")
public class Memberscontroller {
	
	private final MemberService ser;
	
	public Memberscontroller(MemberService ser)
	{
		this.ser=ser;
	}
	
	@PostMapping
	public Members createmember(@RequestBody Membersdto mem)
	{
		return ser.saveMember(mem);	
	}
	

}
