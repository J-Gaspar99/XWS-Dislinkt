package com.dislinkt.followRequest;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection ="FollowRequests")

public class FollowRequest {
    @Transient
    public static final String SEQUENCE_NAME = "followrequests_sequence";
    @Id
    private Integer id;
    private Integer followerId;
    private Integer followingId;
    private String followerUserName;
    private String followingUserName;

}
