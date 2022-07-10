package com.example.Agent.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Agent.model.Comment;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment,Integer> {

	List<Comment> findByOfferId(Integer offerId);


}