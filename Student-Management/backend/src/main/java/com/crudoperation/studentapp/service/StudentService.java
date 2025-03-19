package com.crudoperation.studentapp.service;

import java.util.List;

import com.crudoperation.studentapp.entity.Student;

public interface StudentService {
	
	public Student addStudent(Student student);
	public Student getStudentDetailsByRollNo(int rollNo);
	public List<Student> getAllStudentDetails();
	public Student updateStudentName(int rollNo, String name);
	public Student updateStudentPercentage(int rollNo,Float percentage);
	public Student updateStudentBranch(int rollNo,String branch);
	public void deleteStudent(int rollNo);
	

}
