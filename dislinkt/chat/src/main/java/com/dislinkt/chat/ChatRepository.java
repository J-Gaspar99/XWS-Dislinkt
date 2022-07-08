package com.dislinkt.chat;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface ChatRepository extends MongoRepository<Chat,Integer> {

   Chat findByChatter1IdAndChatter2Id(Integer chatter1Id, Integer chatter2Id);




}