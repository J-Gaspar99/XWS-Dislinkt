package com.dislinkt.like;



import com.dislinkt.like.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LikeController {

    @Autowired
    private LikeRepository likeRepository;

    //CREATE
    @PostMapping("/like")
    public String createLike(@RequestBody Like like){
        likeRepository.save(like);
        return "Created like with id: " + like.getId();
    }

    //FIND ALL
    @GetMapping("/like")
    public List<Like> getLikes(){
        return likeRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/like/{id}")
    public Optional<Like> getLike(@PathVariable int id){
        return likeRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/like/{id}")
    public String deleteLike(@PathVariable int id){
        likeRepository.deleteById(id);
        return "Deleted like with id: " + id;
    }


    //UPDATE
    @PutMapping("/like/{id}")
    public ResponseEntity<Like> updateLike(@PathVariable Integer id, @RequestBody Like likeDetails){
        Like like = likeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Like does not exist with id:"+ id));

        like.setOwnerId(likeDetails.getOwnerId());
        like.setPostId(likeDetails.getPostId());

        Like updatedLike = likeRepository.save(like);
        return ResponseEntity.ok(updatedLike);
    }


}

