package com.dislinkt.followRequest;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FollowRequestRepository extends MongoRepository<FollowRequest,Integer> {
    FollowRequest findByFollowerId(Integer follower);
    FollowRequest findByFollowingId(Integer following);
}