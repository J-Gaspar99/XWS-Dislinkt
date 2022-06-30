package com.dislinkt.like;

import org.springframework.data.mongodb.repository.MongoRepository;



public interface LikeRepository extends MongoRepository<Like,Integer> {


}