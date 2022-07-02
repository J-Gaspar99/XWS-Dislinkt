package com.dislinkt.dislike;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface DislikeRepository extends MongoRepository<Dislike,Integer> {
   List<Dislike> findByOwnerId(Integer ownerId);
    List<Dislike> findByPostId(Integer postId);
    Dislike findByOwnerIdAndPostId(Integer ownerId, Integer postId);


}