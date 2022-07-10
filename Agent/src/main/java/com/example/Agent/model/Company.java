package com.example.Agent.model;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.sql.*;

@Getter
@Setter
@ToString
@Document(collection ="Company")
public class Company {
	@Transient
	public static final String SEQUENCE_NAME = "agent_companies_sequence";
	@Id
	private Integer id;
	private String name; 
	private String description;
	private String culture;
	private String phone;
	private String email;
	private String webAddress;
	private Integer ownerId;
	private Boolean isEnabled;
	



}
