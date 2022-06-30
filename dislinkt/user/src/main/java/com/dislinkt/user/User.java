package com.dislinkt.user;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@ToString

@Document(collection ="User")

public class User {
    @Id
    private Integer id;

    private String userName;
    private String password;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String gender;
    private Date dateOfBirth;
    private String biography;
    private String workExperience;
    private String hobbies;
    private Integer publicity;

}
