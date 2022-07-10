package com.dislinkt.post;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post,Integer> {
   List<Post> findByOwnerId(Integer ownerId);

}
