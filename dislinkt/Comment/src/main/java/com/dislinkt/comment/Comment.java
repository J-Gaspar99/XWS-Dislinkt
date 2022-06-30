package com.dislinkt.comment;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@ToString

@Document(collection ="Comment")
public class Comment {
    @Id
    private Integer id;
    private Integer ownerId;
    private Integer postId;
    private String text;

}
