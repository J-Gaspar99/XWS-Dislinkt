package com.dislinkt.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection ="User")

public class User {
    @Id
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
}
