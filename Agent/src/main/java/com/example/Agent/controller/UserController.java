package com.example.Agent.controller;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Agent.model.User;
import com.example.Agent.repository.UserRepository;
import com.example.Agent.exception.ResourceNotFoundException;


@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SequencerService seqService;

    //CREATE
    @PostMapping("/user")
    public String createUser(@RequestBody User user){
        user.setId(seqService.getSeq("agent_users_sequence"));
        userRepository.save(user);
        return "Created user with id: " + user.getId();
    }


    //FIND BY ID
    @GetMapping("/user/{id}")
    public Optional<User> getUser(@PathVariable Integer id){
        return userRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
        return "Deleted user with id: " + id;
    }


    //UPDATE
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User does not exist with id:"+ id));

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());

        user.setFirstname(userDetails.getFirstname());
        user.setLastname(userDetails.getLastname());
        user.setEmail(userDetails.getEmail());
        user.setUloga(userDetails.getUloga());
        
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    //FIND BY USERNAME AND PASSWORD
    @GetMapping("/user/{userName}/{password}")
    public User logUser(@PathVariable("userName") String userName, @PathVariable("password") String password){
        User loggedUser = userRepository.findByUsernameAndPassword(userName,password);
        return loggedUser;
    }


}
