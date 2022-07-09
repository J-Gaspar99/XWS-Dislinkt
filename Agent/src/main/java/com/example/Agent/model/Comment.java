package com.example.Agent.model;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.sql.*;


@Document(collection ="Comment")
public class Comment {
	@Id
	private ObjectId id; 	
	private ObjectId user_id;
	private ObjectId job_offer_id;
	private String comment_text;
	private String interview_process;
	private Integer salary;
	private Integer grade;
	
	public Comment(ObjectId id, ObjectId user_id, ObjectId job_offer_id, String comment_text, String interview_process,
			Integer salary, Integer grade) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.job_offer_id = job_offer_id;
		this.comment_text = comment_text;
		this.interview_process = interview_process;
		this.salary = salary;
		this.grade = grade;
	}
	public ObjectId getId() {
		return id;
	}
	public void setId(ObjectId id) {
		this.id = id;
	}
	public ObjectId getUser_id() {
		return user_id;
	}
	public void setUser_id(ObjectId user_id) {
		this.user_id = user_id;
	}
	public ObjectId getJob_offer_id() {
		return job_offer_id;
	}
	public void setJob_offer_id(ObjectId job_offer_id) {
		this.job_offer_id = job_offer_id;
	}
	public String getComment_text() {
		return comment_text;
	}
	public void setComment_text(String comment_text) {
		this.comment_text = comment_text;
	}
	public String getInterview_process() {
		return interview_process;
	}
	public void setInterview_process(String interview_process) {
		this.interview_process = interview_process;
	}
	public Integer getSalary() {
		return salary;
	}
	public void setSalary(Integer salary) {
		this.salary = salary;
	}
	public Integer getGrade() {
		return grade;
	}
	public void setGrade(Integer grade) {
		this.grade = grade;
	}
	
	
	
	
	
	
	
	
}
