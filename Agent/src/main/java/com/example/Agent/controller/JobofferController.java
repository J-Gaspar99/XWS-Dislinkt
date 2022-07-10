package com.example.Agent.controller;


import com.example.Agent.model.Joboffer;
import com.example.Agent.repository.JobofferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
//@RequestMapping(value = "/api/joboffer", produces = MediaType.APPLICATION_JSON_VALUE)
public class JobofferController {

    @Autowired
    private JobofferRepository jobofferRepository;
    @Autowired
    private SequencerService seqService;

    //CREATE
    @PostMapping("/joboffer")
    public String createJobOffer(@RequestBody Joboffer joboffer){
        joboffer.setId(seqService.getSeq("agent_joboffers_sequence"));
        jobofferRepository.save(joboffer);
        return "Created job offer with id: " + joboffer.getId();
    }

    //FIND ALL
    @GetMapping("/joboffer")
    public List<Joboffer> getJobOffer(){
        return jobofferRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/joboffer/{id}")
    public Optional<Joboffer> getJoboffer(@PathVariable Integer id){
        return jobofferRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/joboffer/{id}")
    public String deleteUser(@PathVariable Integer id){
        jobofferRepository.deleteById(id);
        return "Deleted job offer with id: " + id;
    }

    //Find by CompanyId
    @GetMapping("/joboffer/companyid/{companyid}")
    public List<Joboffer> getJobOfferByCompanyId(@PathVariable("companyid") Integer companyid){

        return jobofferRepository.findByCompanyId(companyid);
    }

}

