package com.dislinkt.user;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "database_sequences")
public class SequencerApplication {



        @Id
        private String id;

        private Integer seq;



        //getters and setters omitted


}
