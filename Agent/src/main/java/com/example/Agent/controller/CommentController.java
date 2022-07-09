package com.example.Agent.controller;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Agent.exception.ResourceNotFoundException;
import com.example.Agent.model.Comment;
import com.example.Agent.model.Company;
import com.example.Agent.model.User;
import com.example.Agent.repository.CommentRepository;
import com.example.Agent.repository.CompanyRepository;
import com.example.Agent.repository.UserRepository;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

	 @Autowired
	    private CommentRepository commentRepository;
	
	 @Autowired
	    private UserRepository userrepository;

	    public CommentController(CommentRepository c, UserRepository u) {
	    	this.commentRepository = c;
	    	this.userrepository = u;
	    }
	    
	    
	    //CREATE
	    @PostMapping("/")
	    public String createComment(@RequestBody Comment comment){
	        String s = "";
	    	if (userrepository.findById(comment.getUser_id()).get().getUloga().equals(2))
	        	{commentRepository.save(comment);
	        	s= "Created company with id:"+comment.getId()+" commentor name : " + comment.getUser_id();
	        	}
	    	else
	    		s="Incorrect user role for this operation";
	    	
	        return s;
	    
	    }


	    //FIND BY ID
	    @GetMapping("/{id}")
	    public Optional<Comment> getUser(@PathVariable ObjectId id){
	        return commentRepository.findById(id);
	    }
	    

}
	

	    
	    
