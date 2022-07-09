package com.example.Agent.controller;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Agent.exception.ResourceNotFoundException;
import com.example.Agent.model.Company;
import com.example.Agent.model.User;
import com.example.Agent.repository.CompanyRepository;
import com.example.Agent.repository.UserRepository;
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/api/company")
public class CompanyController {

	 @Autowired
	    private CompanyRepository companyRepository;
	 @Autowired  
	 	private UserRepository userRepository;

	   /* public CompanyController(CompanyRepository cr,UserRepository ur) {
	    	this.companyRepository = cr;
	    	this.userRepository = ur;
	    }*/
	    
	    
	    //CREATE
	    @PostMapping("/company")
	    public String createCompany(@RequestBody Company company){
	        companyRepository.save(company);
	        return "Created company with id:"+company.getId();
	    }


	    //FIND BY ID
	    @GetMapping("/company/{id}")
	    public Optional<Company> getCompany(@PathVariable ObjectId id){
	        return companyRepository.findById(id);
	    }
	    
	    //FIND BY ID
	    @GetMapping("/company/all")
	    public List<Company> getAllCompany(){
	        return companyRepository.findAll();
	    }
	    

	    //DELETE
	    @DeleteMapping("/company/{id}")
	    public String deleteUser(@PathVariable int id){
	        companyRepository.deleteById(id);
	        return "Deleted user with id: " + id;
	    }


	    //UPDATE
	    @PutMapping("/company/{id}")
	    public ResponseEntity<Company> updateCompany(@PathVariable ObjectId id, @RequestParam String Description){
	        Company company = companyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Company does not exist with id:"+ id));
	    	company.setDescription(Description);
	   return ResponseEntity.ok(companyRepository.save(company));
	    }
	
	    //UPDATE
	    @PutMapping("/company/enable/{id}")
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
