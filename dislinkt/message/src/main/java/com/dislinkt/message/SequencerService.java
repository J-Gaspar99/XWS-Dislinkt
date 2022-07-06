package com.dislinkt.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;


@Service
public class SequencerService {

    @Autowired
    private MongoOperations mongoOperations;

    public int getSeq(String seqName){
        Query query= new Query(Criteria.where("id").is(seqName));

        Update update = new Update().inc( "seq",1);
        SequencerApplication counter = mongoOperations
                .findAndModify(query,
                        update,options().returnNew(true).upsert(true),
                        SequencerApplication.class);

        return !Objects.isNull(counter) ? counter.getSeq() :1 ;
    }
}
