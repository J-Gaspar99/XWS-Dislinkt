package com.dislinkt.follows;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FollowsRepository extends MongoRepository<Follows,Integer> {
}
