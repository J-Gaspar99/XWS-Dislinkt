package com.dislinkt.image;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@ToString

@Document(collection ="Image")
public class Image {
    @Transient
    public static final String SEQUENCE_NAME = "images_sequence";
    @Id
    private Integer id;
    private Integer postId;
    private String image1;

}
