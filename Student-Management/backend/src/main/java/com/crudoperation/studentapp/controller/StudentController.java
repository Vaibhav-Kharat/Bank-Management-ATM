package com.crudoperation.studentapp.controller;

import java.util.List;

import org.slf4j.helpers.Reporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.crudoperation.studentapp.entity.Student;
import com.crudoperation.studentapp.repositry.StudentRepositry;
import com.crudoperation.studentapp.service.StudentService;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student")
public class StudentController {
	
	@Autowired
	StudentService service;
	
	
	//add student
	@PostMapping("/add")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<Student> addStudent(@RequestBody Student student){
		Student addStudent = service.addStudent(student);
		return ResponseEntity.status(HttpStatus.CREATED).body(addStudent);
	}
	
	//get student by roll no
	@GetMapping("/{rollNo}")
	public Student getStudentByRollNo(@PathVariable int rollNo){
		Student getStudentDetailsByRollNo = service.getStudentDetailsByRollNo(rollNo);
		return getStudentDetailsByRollNo;
	}
	
	//get all students 
	@GetMapping("/getAllStudents")
	public List<Student> getAllStudentDetails() {
		List<Student> allStudentDetails = service.getAllStudentDetails();
		return allStudentDetails;
	}
	
	//edit student details
	@PutMapping("/updateStudentName/{rollNo}/{name}")
	public Student updateNameDetails(@PathVariable int rollNo, @PathVariable String name ) {
		Student student = service.updateStudentName(rollNo, name);
		return student;
	}
	
	@PutMapping("/updateStudentPercentage/{rollNo}/{percentage}")
	public Student updatePercentageDetails(@PathVariable int rollNo, @PathVariable Float percentage) {
		Student student = service.updateStudentPercentage(rollNo, percentage);
		return student;
	}
	
	@PutMapping("/updateStudentBranch/{rollNo}/{branch}")
	public Student updateBranchDetails(@PathVariable int rollNo, @PathVariable String branch) {
		//TODO: process PUT request
		Student student = service.updateStudentBranch(rollNo, branch);
		return student;
	}
	
	@DeleteMapping("/delete/{rollNo}")
	public ResponseEntity<String> deleteStudent(@PathVariable int rollNo){
		service.deleteStudent(rollNo);
		return ResponseEntity.ok("Student Removed...!!!");
	}
	
	
}
