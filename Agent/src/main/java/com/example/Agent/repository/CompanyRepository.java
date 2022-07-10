package com.example.Agent.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Agent.model.Company;
import com.example.Agent.model.User;

public interface CompanyRepository extends MongoRepository<Company,Integer> {



	Company findByOwnerId(Integer ownerId);

	List<Company> findByIsEnabled(Boolean isEnabled);


}
