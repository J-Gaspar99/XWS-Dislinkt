package com.example.Agent.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Agent.model.Comment;
import com.example.Agent.model.User;

public interface CommentRepository extends MongoRepository<Comment,Integer> {

	Comment save(Comment user);

	Optional<Comment> findById(ObjectId id);

	void deleteById(Integer id);


}