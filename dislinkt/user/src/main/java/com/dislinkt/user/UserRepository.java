package com.dislinkt.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface UserRepository extends MongoRepository<User,Integer> {
    User findByUserNameAndPassword(String userName, String password);

    List<User> findByPublicity(Integer publicity);

    User findByFirstNameAndLastName(String firstName, String lastName);

    User findByUserName(String userName);


}


