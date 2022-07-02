package com.dislinkt.comment;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface CommentRepository extends MongoRepository<Comment,Integer> {
    List<Comment> findByOwnerId(Integer ownerId);
    List<Comment> findByPostId(Integer postId);
    Comment findByOwnerIdAndPostId(Integer ownerId, Integer postId);


}