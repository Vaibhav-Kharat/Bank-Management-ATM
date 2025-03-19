package com.crudoperation.studentapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="Student")
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_seq")
    @SequenceGenerator(name = "my_seq", sequenceName = "my_sequence", initialValue = 101, allocationSize = 1)
	private int id;
	
	@Column(name="Roll No")
	private int rollNo;
	
	@Column(name="Name")
	private String name;
	
	@Column(name="Percentage")
	private float percentage;
	
	@Column(name="Branch")
	private String branch;
	
	//DEFAULT CONSTRUCTOR
	public Student(){
		
		
	}
	
	//PARAMETRTIZED CONSTRUCTOR
	public Student(int rollNo, String name, float percentage, String branch) {
		super();
		this.rollNo=rollNo;
		this.name=name;
		this.percentage=percentage;
		this.branch=branch;
	}


	//GETTER SETTER METHODS
	public int getRollNo() {
		return rollNo;
	}

	public void setRollNo(int rollNo) {
		this.rollNo = rollNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getPercentage() {
		return percentage;
	}

	public void setPercentage(float percentage) {
		this.percentage = percentage;
	}
	
	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}
	
	
	@Override
	public String toString() {
		return "Student [id=" + id + ", rollNo=" + rollNo + ", name=" + name + ", percentage=" + percentage
				+ ", branch=" + branch + "]";
	}

}
