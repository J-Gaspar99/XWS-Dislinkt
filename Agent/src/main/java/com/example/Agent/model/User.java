package com.example.Agent.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.sql.*;

@Document(collection ="User")
public class User {
	@Id
	private ObjectId id;
	
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String email;
	private Integer uloga;
	
	public User() {}
	
	public User(String username, String password, String firstname, String lastname, String email) {
		super();
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		//this.uloga = new Role("REGISTROVAN");
		this.uloga = 2;
		
	}

	/*public String getId() {
		return id;
	}*/
	public void setId(ObjectId id) {
		this.id = id;
	}

	public ObjectId getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getUloga() {
		return uloga;
	}
	public void setUloga(Integer uloga) {
		this.uloga = uloga;
	}
	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", firstname=" + firstname + ", lastname="
				+ lastname + ", email=" + email + ", uloga=" + uloga + "]";
	}

	
	
	
	
}
