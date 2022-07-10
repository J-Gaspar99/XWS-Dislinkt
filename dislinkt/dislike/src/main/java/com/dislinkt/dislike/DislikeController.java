package com.dislinkt.dislike;



import com.dislinkt.dislike.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DislikeController {

    @Autowired
    private DislikeRepository dislikeRepository;
    @Autowired
    private SequencerService seqService;

    //CREATE
    @PostMapping("/dislike")
    public String createLike(@RequestBody Dislike dislike){
        dislike.setId(seqService.getSeq("dislikes_sequence"));
        dislikeRepository.save(dislike);
        return "Created dislike with id: " + dislike.getId();
    }

    //FIND ALL
    @GetMapping("/dislike")
    public List<Dislike> getDisLikes(){
        return dislikeRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/dislike/{id}")
    public Optional<Dislike> getLike(@PathVariable int id){
        return dislikeRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/dislike/{id}")
    public String deleteLike(@PathVariable int id){
        dislikeRepository.deleteById(id);
        return "Deleted dislike with id: " + id;
    }


    //UPDATE
    @PutMapping("/dislike/{id}")
    public ResponseEntity<Dislike> updateLike(@PathVariable Integer id, @RequestBody Dislike dislikeDetails){
        Dislike dislike = dislikeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Dislike does not exist with id:"+ id));

        dislike.setOwnerId(dislikeDetails.getOwnerId());
        dislike.setPostId(dislikeDetails.getPostId());

        Dislike updatedDislike = dislikeRepository.save(dislike);
        return ResponseEntity.ok(updatedDislike);
    }


    //get by OwnerId
    @GetMapping("/dislike/ownerid/{ownerid}")
    public List <Dislike> getDislikeByOwnerId(@PathVariable("ownerid") Integer ownerid){
        return dislikeRepository.findByOwnerId(ownerid);

    }


    //get by PostId
    @GetMapping("/dislike/postid/{postid}")
    public List <Dislike> getDislikeByPostId(@PathVariable("postid") Integer postid){
        return dislikeRepository.findByPostId(postid);

    }


    //get by ownerId and PostId
    @GetMapping("/dislike/owneridpostid/{ownerid}/{postid}")
    public Dislike getDislikeByOwnerIdAndPostId(@PathVariable("ownerid") Integer ownerid, @PathVariable("postid") Integer postid) {
        return dislikeRepository.findByOwnerIdAndPostId(ownerid, postid);

    }
}

