package com.dislinkt.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@ToString

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection ="User")

public class User {
    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";
    @Id
    private Integer id;

    private String userName;
    private String password;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String gender;
    private Integer birthDay;
    private Integer birthMonth;
    private Integer birthYear;
    private String biography;
    private String workExperience;
    private String hobbies;
    private Integer publicity;

}
