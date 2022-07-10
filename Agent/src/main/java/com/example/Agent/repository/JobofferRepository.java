package com.example.Agent.repository;

import java.util.List;
import java.util.Optional;

import com.example.Agent.model.Comment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Agent.model.Joboffer;



public interface JobofferRepository extends MongoRepository<Joboffer,Integer> {

    List<Joboffer> findByCompanyId(Integer companyId);
	
}
