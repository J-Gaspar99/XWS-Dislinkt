package com.example.Agent.repository;

import com.example.Agent.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepository extends MongoRepository<User,Integer> {

	User findByUsernameAndPassword(String username, String password);


}
