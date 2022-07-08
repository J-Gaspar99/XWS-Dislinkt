package com.dislinkt.follows;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection ="Follows")

public class Follows {
    @Transient
    public static final String SEQUENCE_NAME = "follows_sequence";
    @Id
    private Integer id;
    private Integer followerId;
    private Integer followingId;
    private String followerUserName;
    private String followingUserName;
    private Integer newMessages;
    private Integer newPosts;

}
