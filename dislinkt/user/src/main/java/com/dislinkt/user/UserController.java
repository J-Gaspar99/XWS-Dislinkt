package com.dislinkt.user;


import com.dislinkt.user.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


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

    //FIND ALL
    @GetMapping("/user")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/user/{id}")
    public Optional<User> getUser(@PathVariable int id){
        return userRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/user/{id}")
    public String deleteuser(@PathVariable int id){
        userRepository.deleteById(id);
        return "Deleted user with id: " + id;
    }


    //UPDATE
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User does not exist with id:"+ id));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());


        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
}

