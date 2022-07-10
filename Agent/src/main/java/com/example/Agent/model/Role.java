package com.example.Agent.model;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.sql.*;


@Document(collection ="Role")
public class Role {
	@Id
	private Integer roleID;
	private String rolename;
	
	public Role() {}
	
	public Role(String Rolename) {
		this.rolename=Rolename;
	if(Rolename.equals("REGISTOVAN"))
		this.roleID=2;
	if(Rolename.equals("VLASNIK"))
		this.roleID=3;
	if(Rolename.equals("ADMIN"))
			this.roleID=1;
	}

	}

