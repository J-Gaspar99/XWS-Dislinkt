package com.dislinkt.block;

import org.springframework.data.mongodb.repository.MongoRepository;



public interface BlockRepository extends MongoRepository<Block,Integer> {

    Block findByBlockerIdAndBlockedId(Integer blockerId, Integer blockedId);



}


