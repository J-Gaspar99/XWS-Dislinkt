package com.dislinkt.comment;




import com.dislinkt.comment.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    //CREATE
    @PostMapping("/comment")
    public String createComment(@RequestBody Comment comment){
        commentRepository.save(comment);
        return "Created comment with id: " + comment.getId();
    }

    //FIND ALL
    @GetMapping("/comment")
    public List<Comment> getComments(){
        return commentRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/comment/{id}")
    public Optional<Comment> getComment(@PathVariable int id){
        return commentRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/comment/{id}")
    public String deleteComment(@PathVariable int id){
        commentRepository.deleteById(id);
        return "Deleted comment with id: " + id;
    }


    //UPDATE
    @PutMapping("/comment/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Integer id, @RequestBody Comment commentDetails){
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment does not exist with id:"+ id));

        comment.setOwnerId(commentDetails.getOwnerId());
        comment.setPostId(commentDetails.getPostId());

        Comment updatedComment = commentRepository.save(comment);
        return ResponseEntity.ok(updatedComment);
    }


}

