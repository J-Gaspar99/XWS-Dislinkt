package com.dislinkt.comment;




import com.dislinkt.comment.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private SequencerService seqService;

    //CREATE
    @PostMapping("/comment")
    public String createComment(@RequestBody Comment comment) {
        comment.setId(seqService.getSeq("comments_sequence"));
        commentRepository.save(comment);
        return "Created comment with id: " + comment.getId();
    }

    //FIND ALL
    @GetMapping("/comment")
    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/comment/{id}")
    public Optional<Comment> getComment(@PathVariable int id) {
        return commentRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/comment/{id}")
    public String deleteComment(@PathVariable int id) {
        commentRepository.deleteById(id);
        return "Deleted comment with id: " + id;
    }


    //UPDATE
    @PutMapping("/comment/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Integer id, @RequestBody Comment commentDetails) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment does not exist with id:" + id));

        comment.setOwnerId(commentDetails.getOwnerId());
        comment.setPostId(commentDetails.getPostId());
        comment.setOwnerUserName(commentDetails.getOwnerUserName());

        Comment updatedComment = commentRepository.save(comment);
        return ResponseEntity.ok(updatedComment);
    }


    //get by OwnerId
    @GetMapping("/comment/ownerid/{ownerid}")
    public List<Comment> getCommentByOwnerId(@PathVariable("ownerid") Integer ownerid) {
        return commentRepository.findByOwnerId(ownerid);

    }


    //get by PostId
    @GetMapping("/comment/postid/{postid}")
    public List<Comment> getCommentByPostId(@PathVariable("postid") Integer postid) {
        return commentRepository.findByPostId(postid);

    }

    //get by ownerId and PostId
    @GetMapping("/comment/owneridpostid/{ownerid}/{postid}")
    public Comment getCommentByOwnerIdAndPostId(@PathVariable("ownerid") Integer ownerid, @PathVariable("postid") Integer postid) {
        return commentRepository.findByOwnerIdAndPostId(ownerid, postid);

    }
}