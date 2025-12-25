package com.ocr.id.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@GetMapping
	public List<Members> getMembers()
	{
		return ser.getMembers();
	}
	
	@GetMapping("/{regnum}")
	public Members getMemberByRegnum(@PathVariable String regnum) {
        return ser.getMemberByRegnum(regnum);
    }
	
	@PutMapping("/{regnum}")
	public Members updateMember(
	        @PathVariable String regnum,
	        @RequestBody Membersdto dto
	) {
	    return ser.updateMember(regnum, dto);
	}


	
	@DeleteMapping("/{regnum}")
	public String deleteMember(@PathVariable String regnum) {
	    ser.deleteMember(regnum);
	    return "Member deleted successfully";
	}

	

}
