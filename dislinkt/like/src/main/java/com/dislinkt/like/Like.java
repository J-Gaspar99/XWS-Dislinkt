package com.dislinkt.like;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@ToString

@Document(collection ="Like")
public class Like {
    @Id
    private Integer id;
    private Integer ownerId;
    private Integer postId;

}
