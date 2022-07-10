package com.dislinkt.follows;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FollowsRepository extends MongoRepository<Follows,Integer> {
   List <Follows> findByFollowerId(Integer follower);
   List <Follows> findByFollowingId(Integer following);
   Follows findByFollowerIdAndFollowingId(Integer follower, Integer following);
}
