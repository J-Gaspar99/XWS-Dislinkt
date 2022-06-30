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
    public String deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
        return "Deleted user with id: " + id;
    }


    //UPDATE
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User does not exist with id:"+ id));

        user.setUserName(userDetails.getUserName());
        user.setPassword(userDetails.getPassword());

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        user.setGender(userDetails.getGender());
        user.setDateOfBirth(userDetails.getDateOfBirth());
        user.setBiography(userDetails.getBiography());
        user.setWorkExperience(userDetails.getWorkExperience());
        user.setHobbies(userDetails.getHobbies());
        user.setPublicity(userDetails.getPublicity());


        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    //FIND BY USERNAME AND PASSWORD
    @GetMapping("/user/{userName}/{password}")
    public User logUser(@PathVariable("userName") String userName, @PathVariable("password") String password){
        User loggedUser = userRepository.findByUserNameAndPassword(userName,password);
        return loggedUser;
    }

    //LOGIN
    @PostMapping("/login/{userName}/{password}")
    public User loginUser(@PathVariable("userName") String userName, @PathVariable("password") String password)
    {
        Optional<User> user = Optional.ofNullable(userRepository.findByUserNameAndPassword(userName,password));
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

