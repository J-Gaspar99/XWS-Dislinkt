package com.dislinkt.block;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection ="Block")

public class Block {
    @Transient
    public static final String SEQUENCE_NAME = "blocks_sequence";
    @Id
    private Integer id;

    private String blockerUserName;
    private String blockedUserName;
    private Integer blockerId;
    private Integer blockedId;



}
