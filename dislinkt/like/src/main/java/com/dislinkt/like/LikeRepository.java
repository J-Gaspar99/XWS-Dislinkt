package com.dislinkt.like;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface LikeRepository extends MongoRepository<Like,Integer> {
  List<  Like > findByOwnerId(Integer ownerId);
    List<Like> findByPostId(Integer postId);
    Like findByOwnerIdAndPostId(Integer ownerId, Integer postId);

}