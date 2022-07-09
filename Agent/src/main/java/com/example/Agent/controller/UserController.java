package com.example.Agent.controller;

import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

import com.example.Agent.model.User;
import com.example.Agent.repository.UserRepository;
import com.example.Agent.exception.ResourceNotFoundException;



@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //CREATE
    @PostMapping("/user")
    public String createUser(@RequestBody User user){
        userRepository.save(user);
        return "Created user with id: " + user.getId();
    }


    //FIND BY ID
    @GetMapping("/user/{id}")
    public Optional<User> getUser(@PathVariable ObjectId id){
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
    public ResponseEntity<User> updateUser(@PathVariable ObjectId id, @RequestBody User userDetails){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User does not exist with id:"+ id));

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());

        user.setFirstname(userDetails.getFirstname());
        user.setLastname(userDetails.getLastname());
        user.setEmail(userDetails.getEmail());
        
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    //FIND BY USERNAME AND PASSWORD
    @GetMapping("/user/{userName}/{password}")
    public User logUser(@PathVariable("userName") String userName, @PathVariable("password") String password){
        Optional<User> loggedUser = Optional.ofNullable(userRepository.findByUsernameAndPassword(userName,password));
        return loggedUser.get();
    }

    //LOGIN
    @PostMapping("/login/{userName}/{password}")
    public User loginUser(@PathVariable("userName") String userName, @PathVariable("password") String password)
    {
        Optional<User> user = Optional.ofNullable(userRepository.findByUsernameAndPassword(userName,password));
        User user2;
        if(!user.isPresent())
        {
            return null;
        }
        else
        {
            user2 = user.get();
            return user2;
        }
    }
}
