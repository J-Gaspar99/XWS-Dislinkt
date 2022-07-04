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
import com.example.Agent.model.Company;
import com.example.Agent.model.User;
import com.example.Agent.repository.CompanyRepository;
import com.example.Agent.repository.UserRepository;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

	 @Autowired
	    private CompanyRepository companyRepository;
	 @Autowired  
	 	private UserRepository userRepository;

	    public CompanyController(CompanyRepository cr,UserRepository ur) {
	    	this.companyRepository = cr;
	    	this.userRepository = ur;
	    }
	    
	    
	    //CREATE
	    @PostMapping("/")
	    public String createCompany(@RequestBody Company company){
	        companyRepository.save(company);
	        return "Created company with id:"+company.getId()+" name : " + company.getName();
	    }


	    //FIND BY ID
	    @GetMapping("/{id}")
	    public Optional<Company> getUser(@PathVariable ObjectId id){
	        return companyRepository.findById(id);
	    }

	    //DELETE
	    @DeleteMapping("/user/{id}")
	    public String deleteUser(@PathVariable int id){
	        companyRepository.deleteById(id);
	        return "Deleted user with id: " + id;
	    }


	    //UPDATE
	    @PutMapping("/{id}")
	    public ResponseEntity<Company> updateCompany(@PathVariable ObjectId id, @RequestParam String Description){
	        Company company = companyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Company does not exist with id:"+ id));
	    	company.setDescription(Description);
	   return ResponseEntity.ok(companyRepository.save(company));
	    }
	
	    //UPDATE
	    @PutMapping("/enable/{id}")
	    public ResponseEntity<Company> EnableCompany(@PathVariable ObjectId id){
	        Company company = companyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Company does not exist with id:"+ id));
	        
	    	company.setIsEnabled(true);       
	    	
	    	User user = userRepository.findById(company.getOwner()).get();
	    	
	    	user.setUloga(3);
	    	
	        userRepository.save(user);
	    	
	    	Company updatedCompany = companyRepository.save(company);
	        
	        return ResponseEntity.ok(updatedCompany);
	    }
	    
	    
	    
	
	
}
