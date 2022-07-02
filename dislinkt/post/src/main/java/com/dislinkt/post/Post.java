package com.dislinkt.post;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection ="User")

public class Post {
    @Id
    private Integer id;
    private String text;
    private Integer likes;
    private Integer dislikes;
    private String comments;
    private Integer ownerId;
}
