package com.dislinkt.follows;



import com.dislinkt.follows.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FollowsController {
    @Autowired
    private FollowsRepository followsRepository;
    @Autowired
    private SequencerService seqService;
    //CREATE
    @PostMapping("/follows")
    public String createFollows(@RequestBody Follows follows){
        follows.setId(seqService.getSeq("follows_sequence"));
        followsRepository.save(follows);
        return "Created follows with id: " + follows.getId();
    }

    //FIND ALL
    @GetMapping("/follows")
    public List<Follows> getFollows(){
        return followsRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/follows/{id}")
    public Optional<Follows> getFollows(@PathVariable int id){
        return followsRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/follows/{id}")
    public String deleteFollows(@PathVariable int id){
        followsRepository.deleteById(id);
        return "Deleted follows with id: " + id;
    }


    //UPDATE
    @PutMapping("/follows/{id}")
    public ResponseEntity<Follows> updateFollows(@PathVariable Integer id, @RequestBody Follows followsDetails){
        Follows follows = followsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Follows does not exist with id:"+ id));

        follows.setFollowerId(followsDetails.getFollowerId());
        follows.setFollowingId(followsDetails.getFollowingId());
        follows.setFollowerUserName(followsDetails.getFollowerUserName());
        follows.setFollowingUserName(followsDetails.getFollowingUserName());
        follows.setNewMessages(followsDetails.getNewMessages());
        follows.setNewPosts(followsDetails.getNewPosts());

        Follows updatedFollows = followsRepository.save(follows);
        return ResponseEntity.ok(updatedFollows);
    }



    //get by Follower
    @GetMapping("/follows/follower/{follower}")
    public List <Follows> getFollowByFollowerId(@PathVariable("follower") Integer follower){
        return followsRepository.findByFollowerId(follower);

    }

    //get by Following
    @GetMapping("/follows/following/{following}")
    public List <Follows> getFollowByFollowingId(@PathVariable("following") Integer following){
        return followsRepository.findByFollowingId(following);

    }

    //get by FollowerAndFollowing
    @GetMapping("/follows/followerandfollowing/{follower}/{following}")
    public Follows getFollowByFollowerIdAndFollowingId(@PathVariable("follower") Integer follower,@PathVariable("following") Integer following){
        return followsRepository.findByFollowerIdAndFollowingId(follower,following);

    }

}
