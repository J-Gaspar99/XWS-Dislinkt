package com.dislinkt.comment;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@ToString

@Document(collection ="Comment")
public class Comment {
    @Transient
    public static final String SEQUENCE_NAME = "comments_sequence";
    @Id
    private Integer id;
    private Integer ownerId;
    private Integer postId;
    private String text;
    private String ownerUserName;

}
