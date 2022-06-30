package com.dislinkt.dislike;


import org.springframework.data.mongodb.repository.MongoRepository;



public interface DislikeRepository extends MongoRepository<Dislike,Integer> {


}