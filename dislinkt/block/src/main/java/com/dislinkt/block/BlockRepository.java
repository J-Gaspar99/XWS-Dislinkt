package com.dislinkt.block;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface BlockRepository extends MongoRepository<Block,Integer> {

    List<Block> findByBlockerIdAndBlockedId(Integer blockerId, Integer blockedId);



}


