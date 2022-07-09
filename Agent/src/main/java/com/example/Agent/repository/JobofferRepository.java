package com.example.Agent.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Agent.model.Joboffer;



public interface JobofferRepository extends MongoRepository<Joboffer,ObjectId> {

	Optional<Joboffer> findById(int id);
   // Joboffer findByUserNameAndPassword(String userName, String password);

	
	
}
