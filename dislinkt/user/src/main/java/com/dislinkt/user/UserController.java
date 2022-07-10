package com.dislinkt.user;


import com.dislinkt.user.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(
        origins = {"http://localhost:3000"}
)
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SequencerService seqService;
    //CREATE
    @PostMapping("/user")
    public String createUser(@RequestBody User user){
        //generate sequence
        user.setId(seqService.getSeq("users_sequence"));
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
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User userDetails){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User does not exist with id:"+ id));

        user.setUserName(userDetails.getUserName());
        user.setPassword(userDetails.getPassword());

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setGender(userDetails.getGender());
        user.setBirthDay(userDetails.getBirthDay());
        user.setBirthMonth(userDetails.getBirthMonth());
        user.setBirthYear(userDetails.getBirthYear());
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


    //get by publicity
    @GetMapping("/user/publicity/{publicity}")
    public List<User> getAllUsersByPublicity(@PathVariable Integer publicity){return userRepository.findByPublicity(publicity);}

    //get by Fname and Lname
    @GetMapping("/user/name/{fname}/{lname}")
    public User getUserByFnameAndLname(@PathVariable("fname") String fname, @PathVariable("lname") String lname){
        return userRepository.findByFirstNameAndLastName(fname,lname);

    }

    //get by UserName
    @GetMapping("/user/username/{username}")
    public User getUserByUserName(@PathVariable("username") String username){
        return userRepository.findByUserName(username);

    }





}

