package com.example.Agent.controller;


import com.example.Agent.model.Joboffer;
import com.example.Agent.repository.JobofferRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value = "/api/joboffer", produces = MediaType.APPLICATION_JSON_VALUE)
public class JobofferController {

    @Autowired
    private JobofferRepository jobofferRepository;

    //CREATE
    @PostMapping("/new")
    public String createUser(@RequestBody Joboffer joboffer){
        jobofferRepository.save(joboffer);
        return "Created joboffer with position: " + joboffer;
    }

    //FIND ALL
    @GetMapping("/all")
    public List<Joboffer> getJobOffer(){
        return jobofferRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/one/{id}")
    public Optional<Joboffer> getJoboffer(@PathVariable int id){
        return jobofferRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable ObjectId id){
        jobofferRepository.deleteById(id);
        return "Deleted user with id: " + id;
    }

}

