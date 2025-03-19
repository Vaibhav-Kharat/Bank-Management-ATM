package com.crudoperation.studentapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crudoperation.studentapp.entity.Student;
import com.crudoperation.studentapp.repositry.StudentRepositry;

@Service
public class StudentServiceImpl implements StudentService{

	@Autowired
	StudentRepositry repo;
	
	@Override
	public Student addStudent(Student student) {
		// TODO Auto-generated method stub
		Student student_saved = repo.save(student);
		return student_saved;
	}

	@Override
	public Student getStudentDetailsByRollNo(int rollNo) {
		// TODO Auto-generated method stub
		Optional<Student> student = repo.findByRollNo(rollNo);
		if(student.isEmpty()) {
			throw new RuntimeException("Student not present in the database");
		}
		Student student_found = student.get();
		return student_found;
	}

	@Override
	public List<Student> getAllStudentDetails() {
		// TODO Auto-generated method stub
		List<Student> listOfStudents = repo.findAll();
		return listOfStudents;
	}

	@Override
	public Student updateStudentName(int rollNo, String name) {
		// TODO Auto-generated method stub
		Optional<Student> student = repo.findByRollNo(rollNo);
		if(student.isEmpty()) {
			throw new RuntimeException("Student not found..!!!");
		}
		Student studentPresent = student.get();
		studentPresent.setName(name);
		repo.save(studentPresent);
		return studentPresent;
	}

	@Override
	public Student updateStudentPercentage(int rollNo, Float percentage) {
		// TODO Auto-generated method stub
		Optional <Student> student = repo.findByRollNo(rollNo);
		if(student.isEmpty()) {
			throw new RuntimeException("Student not found...!!!");
		}
		Student studentPresent = student.get();
		studentPresent.setPercentage(percentage);
		repo.save(studentPresent);
		return studentPresent;
	}

	@Override
	public Student updateStudentBranch(int rollNo, String branch) {
		// TODO Auto-generated method stub
		Optional<Student> student = repo.findByRollNo(rollNo);
		if(student.isEmpty()) {
			throw new RuntimeException("Student not found..!!");
		}
		Student studentPresent = student.get();
		studentPresent.setBranch(branch);
		repo.save(studentPresent);
		return studentPresent;
	}

	@Override
	public void deleteStudent(int rollNo) {
	    Student student = getStudentDetailsByRollNo(rollNo);
	    repo.delete(student);
	}



}
