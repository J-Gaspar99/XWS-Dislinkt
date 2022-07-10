package com.example.Agent.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString
@Document(collection ="User")
public class User {
	@Transient
	public static final String SEQUENCE_NAME = "agent_users_sequence";
	@Id
	private Integer id;
	
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String email;
	private Integer uloga;

	
	
	
}
