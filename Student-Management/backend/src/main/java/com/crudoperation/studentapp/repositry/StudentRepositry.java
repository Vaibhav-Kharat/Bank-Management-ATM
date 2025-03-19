package com.crudoperation.studentapp.repositry;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crudoperation.studentapp.entity.Student;

public interface StudentRepositry extends JpaRepository<Student, Integer>{

	Optional<Student> findByRollNo(int rollNo);

}
