package com.example.Agent.controller;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Agent.exception.ResourceNotFoundException;
import com.example.Agent.model.Comment;
import com.example.Agent.model.Company;
import com.example.Agent.model.User;
import com.example.Agent.repository.CommentRepository;
import com.example.Agent.repository.CompanyRepository;
import com.example.Agent.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private SequencerService seqService;

	//CREATE
	@PostMapping("/comment")
	public String createComment(@RequestBody Comment comment) {
		comment.setId(seqService.getSeq("comments_sequence"));
		commentRepository.save(comment);
		return "Created comment with id: " + comment.getId();
	}

	//FIND ALL
	@GetMapping("/comment")
	public List<Comment> getComments() {
		return commentRepository.findAll();
	}

	//FIND BY ID
	@GetMapping("/comment/{id}")
	public Optional<Comment> getComment(@PathVariable int id) {
		return commentRepository.findById(id);
	}

	//DELETE
	@DeleteMapping("/comment/{id}")
	public String deleteComment(@PathVariable int id) {
		commentRepository.deleteById(id);
		return "Deleted comment with id: " + id;
	}


	//UPDATE
	@PutMapping("/comment/{id}")
	public ResponseEntity<Comment> updateComment(@PathVariable Integer id, @RequestBody Comment commentDetails) {
		Comment comment = commentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment does not exist with id:" + id));

		comment.setOwnerId(commentDetails.getOwnerId());
		comment.setOfferId(commentDetails.getOfferId());
		comment.setOwnerUsername(commentDetails.getOwnerUsername());
		comment.setText(commentDetails.getText());
		comment.setInterview(commentDetails.getInterview());
		comment.setSalary(commentDetails.getSalary());
		comment.setGrade(commentDetails.getGrade());


		Comment updatedComment = commentRepository.save(comment);
		return ResponseEntity.ok(updatedComment);
	}





	//get by PostId
	@GetMapping("/comment/offerid/{offerid}")
	public List<Comment> getCommentByOfferId(@PathVariable("offerid") Integer offerid) {
		return commentRepository.findByOfferId(offerid);

	}




	    

}
	

	    
	    
