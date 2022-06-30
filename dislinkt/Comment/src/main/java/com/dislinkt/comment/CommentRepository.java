package com.dislinkt.comment;


import org.springframework.data.mongodb.repository.MongoRepository;



public interface CommentRepository extends MongoRepository<Comment,Integer> {


}