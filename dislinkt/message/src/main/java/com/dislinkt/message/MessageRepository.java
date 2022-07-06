package com.dislinkt.message;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface MessageRepository extends MongoRepository<Message,Integer> {

    List<Message> findBySenderIdAndReceiverId(Integer senderId, Integer receiverId);
    List<Message> findByChatId(Integer chatId);


}


