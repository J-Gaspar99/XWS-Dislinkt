package com.example.Agent.repository;

import java.util.Optional;

import com.example.Agent.model.User;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepository extends MongoRepository<User,ObjectId> {

	User save(User user);

	Optional<User> findById(ObjectId id);

	void deleteById(Integer id);

	User findByUsernameAndPassword(String username, String password);


}
