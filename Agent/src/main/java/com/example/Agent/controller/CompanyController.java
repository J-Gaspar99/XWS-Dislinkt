package com.example.Agent.controller;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Agent.exception.ResourceNotFoundException;
import com.example.Agent.model.Company;
import com.example.Agent.repository.CompanyRepository;


@CrossOrigin(origins = {"http://localhost:3000"})
@RestController

public class CompanyController {

	 @Autowired
	    private CompanyRepository companyRepository;

	@Autowired
	private SequencerService seqService;


	    
	    
	    //CREATE
	    @PostMapping("/company")
	    public String createCompany(@RequestBody Company company){
			company.setId(seqService.getSeq("agent_companies_sequence"));
	        companyRepository.save(company);
	        return "Created company with id:"+company.getId();
	    }


	    //FIND BY ID
	    @GetMapping("/company/{id}")
	    public Optional<Company> getCompany(@PathVariable Integer id){
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
	    public ResponseEntity<Company> updateCompany(@PathVariable Integer id, @RequestBody  Company companyDetails){
	        Company company = companyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Company does not exist with id:"+ id));

			company.setName(companyDetails.getName());
			company.setDescription(companyDetails.getDescription());
			company.setCulture(companyDetails.getCulture());
			company.setPhone(companyDetails.getPhone());
			company.setEmail(companyDetails.getEmail());
			company.setWebAddress(companyDetails.getWebAddress());
			company.setOwnerId(companyDetails.getOwnerId());
			company.setIsEnabled(companyDetails.getIsEnabled());

			Company updatedCompany = companyRepository.save(company);
			return ResponseEntity.ok(updatedCompany);
	    }


		//FIND BY OWNER
		@GetMapping("/company/ownerid/{ownerid}")
		public Company getCompanyByOwnerId(@PathVariable("ownerid") Integer ownerid){
			return companyRepository.findByOwnerId(ownerid);

		}

	//FIND BY ENABLED
	@GetMapping("/company/isenabled/{isenabled}")
	public List <Company> getCompanyByIsEnabled(@PathVariable("isenabled") Boolean isenabled){
		return companyRepository.findByIsEnabled(isenabled);

	}
	    
	    
	
	
}
