package com.dislinkt.followRequest;


import com.dislinkt.followRequest.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
public class FollowRequestController {
    @Autowired
    private FollowRequestRepository followRequestRepository;

    //CREATE
    @PostMapping("/followRequest")
    public String createFollowRequest(@RequestBody FollowRequest followRequest){
        followRequestRepository.save(followRequest);
        return "Created followRequest with id: " + followRequest.getId();
    }

    //FIND ALL
    @GetMapping("/followRequest")
    public List<FollowRequest> getFollowRequest(){
        return followRequestRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/followRequest/{id}")
    public Optional<FollowRequest> getFollowRequest(@PathVariable int id){
        return followRequestRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/followRequest/{id}")
    public String deleteFollowRequest(@PathVariable int id){
        followRequestRepository.deleteById(id);
        return "Deleted followRequest with id: " + id;
    }


    //UPDATE
    @PutMapping("/followRequest/{id}")
    public ResponseEntity<FollowRequest> updateFollowRequest(@PathVariable Integer id, @RequestBody FollowRequest followRequestDetails){
        FollowRequest followRequest = followRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("FollowRequest does not exist with id:"+ id));

        followRequest.setFollowerId(followRequestDetails.getFollowerId());
        followRequest.setFollowingId(followRequestDetails.getFollowingId());


        FollowRequest updatedFollowRequest = followRequestRepository.save(followRequest);
        return ResponseEntity.ok(updatedFollowRequest);
    }

    //get by Follower
    @GetMapping("/followRequest/follower/{follower}")
    public FollowRequest getFollowByFollowerId(@PathVariable("follower") Integer follower){
        return followRequestRepository.findByFollowerId(follower);

    }

    //get by Following
    @GetMapping("/followRequest/following/{following}")
    public FollowRequest getFollowByFollowingId(@PathVariable("following") Integer following){
        return followRequestRepository.findByFollowingId(following);

    }

}
