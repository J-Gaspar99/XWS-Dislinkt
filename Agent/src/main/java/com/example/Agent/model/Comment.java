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
@Document(collection ="Comment")
public class Comment {
	@Transient
	public static final String SEQUENCE_NAME = "agent_comments_sequence";
	@Id
	private Integer id;
	private Integer ownerId;
	private Integer offerId;
	private String ownerUsername;
	private String text;
	private String interview;
	private String salary;
	private Float grade;
	

	
	
	
	
	
	
}
