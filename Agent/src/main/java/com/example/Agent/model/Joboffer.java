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

@Document(collection ="Joboffer")

public class Joboffer {
	@Transient
	public static final String SEQUENCE_NAME = "agent_joboffers_sequence";
    @Id
    private Integer id;
    private String position;
    private String description;
    private String dailyActivities;
    private String preconditions;
    private Integer companyId;
    private String companyName;
    




}


