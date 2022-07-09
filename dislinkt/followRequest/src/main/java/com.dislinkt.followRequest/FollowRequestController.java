package com.dislinkt.followRequest;


import com.dislinkt.followRequest.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FollowRequestController {
    @Autowired
    private FollowRequestRepository followRequestRepository;
    @Autowired
    private SequencerService seqService;

    //CREATE
    @PostMapping("/followrequest")
    public String createFollowRequest(@RequestBody FollowRequest followRequest){
        followRequest.setId(seqService.getSeq("followrequests_sequence"));
        followRequestRepository.save(followRequest);
        return "Created followRequest with id: " + followRequest.getId();
    }

    //FIND ALL
    @GetMapping("/followrequest")
    public List<FollowRequest> getFollowRequest(){
        return followRequestRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/followrequest/{id}")
    public Optional<FollowRequest> getFollowRequest(@PathVariable int id){
        return followRequestRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/followrequest/{id}")
    public String deleteFollowRequest(@PathVariable int id){
        followRequestRepository.deleteById(id);
        return "Deleted followRequest with id: " + id;
    }


    //UPDATE
    @PutMapping("/followrequest/{id}")
    public ResponseEntity<FollowRequest> updateFollowRequest(@PathVariable Integer id, @RequestBody FollowRequest followRequestDetails){
        FollowRequest followRequest = followRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("FollowRequest does not exist with id:"+ id));

        followRequest.setFollowerId(followRequestDetails.getFollowerId());
        followRequest.setFollowingId(followRequestDetails.getFollowingId());
        followRequest.setFollowerUserName(followRequestDetails.getFollowerUserName());
        followRequest.setFollowingUserName(followRequestDetails.getFollowingUserName());


        FollowRequest updatedFollowRequest = followRequestRepository.save(followRequest);
        return ResponseEntity.ok(updatedFollowRequest);
    }

    //get by Follower
    @GetMapping("/followrequest/follower/{follower}")
    public List <FollowRequest> getFollowByFollowerId(@PathVariable("follower") Integer follower){
        return followRequestRepository.findByFollowerId(follower);

    }

    //get by Following
    @GetMapping("/followrequest/following/{following}")
    public List <FollowRequest> getFollowByFollowingId(@PathVariable("following") Integer following){
        return followRequestRepository.findByFollowingId(following);

    }

    //get by FollowerAndFollowing
    @GetMapping("/followrequest/followerandfollowing/{follower}/{following}")
    public FollowRequest getFollowByFollowerIdAndFollowingId(@PathVariable("follower") Integer follower,@PathVariable("following") Integer following){
        return followRequestRepository.findByFollowerIdAndFollowingId(follower,following);

    }

}
