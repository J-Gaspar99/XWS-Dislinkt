package com.dislinkt.image;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface ImageRepository extends MongoRepository<Image,Integer> {

  Image findByPostId(Integer postId);

}