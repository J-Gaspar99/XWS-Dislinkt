package com.dislinkt.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
//@RequestMapping("api/v1/users")  //on ovo nema videcemo po potrebi
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //CREATE
    @PostMapping("/createUser")
    public String createUser(@RequestBody User user){
        userRepository.save(user);
        return "Created user with id: " + user.getId();
    }

    //FIND ALL
    @GetMapping("/findAllUsers")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/findById/{id}")
    public Optional<User> getUser(@PathVariable int id){
        return userRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/deleteUser/{id}")
    public String deleteuser(@PathVariable int id){
        userRepository.deleteById(id);
        return "Deleted user with id: " + id;
    }


}

