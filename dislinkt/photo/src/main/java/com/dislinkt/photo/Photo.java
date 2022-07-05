package com.dislinkt.photo;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection="Photo")
public class Photo
{

    @Id
    private  String id;
    private String title;
    private Binary image;
    private Integer postId;


    public Photo(String title) {
        this.title = title;
    }

}
