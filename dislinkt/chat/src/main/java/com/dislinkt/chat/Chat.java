package com.dislinkt.chat;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@ToString

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection ="Chat")

public class Chat {
    @Transient
    public static final String SEQUENCE_NAME = "chats_sequence";
    @Id
    private Integer id;

    private Integer chatter1Id;
    private Integer chatter2Id;
    private String chatter1;
    private String chatter2;

}

