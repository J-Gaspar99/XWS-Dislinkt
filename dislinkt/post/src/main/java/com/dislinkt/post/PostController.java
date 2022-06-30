package com.dislinkt.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stasaaleksadavid.isabackend.exception.ResourceNotFoundException;


import java.util.List;
import java.util.Optional;


@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;

    //CREATE
    @PostMapping("/post")
    public String createPost(@RequestBody Post post){
        postRepository.save(post);
        return "Created post with id: " + post.getId();
    }

    //FIND ALL
    @GetMapping("/post")
    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/post/{id}")
    public Optional<Post> getPost(@PathVariable int id){
        return postRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/post/{id}")
    public String deletePost(@PathVariable int id){
        postRepository.deleteById(id);
        return "Deleted post with id: " + id;
    }


    //UPDATE
    @PutMapping("/post/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Integer id, @RequestBody Post postDetails){
        Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post does not exist with id:"+ id));

        post.setText(postDetails.getText());
        post.setLikes(postDetails.getLikes());
        post.setDislikes(postDetails.getDislikes());
        post.setComments(postDetails.getComments());
        post.setOwnerId(postDetails.getOwnerId());


        Post updatedPost = postRepository.save(post);
        return ResponseEntity.ok(updatedPost);
    }
}
