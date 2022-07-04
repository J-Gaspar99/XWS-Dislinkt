package com.example.Agent.model;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.sql.*;


@Document(collection ="Company")
public class Company {

	@Id
	private ObjectId id;
	private String name; 
	private String description;
	private String culture;
	private String phone;
	private String email;
	private String webAdress;
	private ObjectId owner;
	private Boolean isEnabled;
	
	
	
	
	
	public Company(ObjectId id, String name, String description, String culture, String phone, String email,
			String webAdress, ObjectId owner, Boolean isEnabled) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.culture = culture;
		this.phone = phone;
		this.email = email;
		this.webAdress = webAdress;
		this.owner = owner;
		this.isEnabled = isEnabled;
	}
	
	
	
	public ObjectId getId() {
		return id;
	}
	public void setId(ObjectId id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCulture() {
		return culture;
	}
	public void setCulture(String culture) {
		this.culture = culture;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getWebAdress() {
		return webAdress;
	}
	public void setWebAdress(String webAdress) {
		this.webAdress = webAdress;
	}
	public ObjectId getOwner() {
		return owner;
	}
	public void setOwner(ObjectId owner) {
		owner = owner;
	}
	public Boolean getIsEnabled() {
		return isEnabled;
	}
	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}



}
