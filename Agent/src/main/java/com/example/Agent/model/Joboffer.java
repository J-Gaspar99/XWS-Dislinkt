package com.example.Agent.model;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.sql.*;



@Document(collection ="Joboffer")

public class Joboffer {
    @Id
    private ObjectId id;
    
    private String position;
    
    private String description;
    
    private List<String> daily_activities;
    
    private List<String> preconditions;
    
    private ObjectId companyId;
    
    public Joboffer() {}

	public Joboffer(ObjectId id, String position, String description, List<String> daily_activities , List<String> preconditions) {
		super();
		this.id = id;
		this.position = position;
		this.description = description;
		this.daily_activities = daily_activities;
		this.preconditions = preconditions;
	}


	public ObjectId getId() {
		return id;
	}


	public void setId(ObjectId id) {
		this.id = id;
	} 



}


