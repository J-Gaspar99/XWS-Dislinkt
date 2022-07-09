package com.dislinkt.post;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection ="Post")

public class Post {
    @Transient
    public static final String SEQUENCE_NAME = "posts_sequence";
    @Id
    private Integer id;
    private String text;
    private String link;
    private Integer likes;
    private Integer dislikes;
    private Integer comments;
    private Integer ownerId;
}
