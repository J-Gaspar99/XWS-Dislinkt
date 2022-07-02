package com.dislinkt.follows;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection ="Follows")

public class Follows {
    @Id
    private Integer id;
    private Integer followerId;
    private Integer followingId;

}
