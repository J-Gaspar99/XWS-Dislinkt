package com.dislinkt.image;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface ImageRepository extends MongoRepository<Image,Integer> {

  Image findByPostId(Integer postId);

}