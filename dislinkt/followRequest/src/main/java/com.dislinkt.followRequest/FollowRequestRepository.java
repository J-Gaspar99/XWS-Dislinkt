package com.dislinkt.followRequest;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FollowRequestRepository extends MongoRepository<FollowRequest,Integer> {
   List <FollowRequest> findByFollowerId(Integer follower);
   List <FollowRequest> findByFollowingId(Integer following);
   FollowRequest findByFollowerIdAndFollowingId(Integer follower, Integer following);
}
