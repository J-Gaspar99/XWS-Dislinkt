package com.dislinkt.message;

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
@Document(collection ="Message")

public class Message {
    @Transient
    public static final String SEQUENCE_NAME = "message_sequence";
    @Id
    private Integer id;

    private String senderUserName;
    private String receiverUserName;
    private Integer senderId;
    private Integer receiverId;
    private Integer chatId;
    private Integer seen;


    private String text;

    private LocalDateTime time;


}
