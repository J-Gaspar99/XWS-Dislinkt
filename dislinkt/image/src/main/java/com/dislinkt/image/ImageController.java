package com.dislinkt.image;


import com.dislinkt.image.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private SequencerService seqService;

    //CREATE
    @PostMapping("/image")
    public String createImage(@RequestBody Image image){
        image.setId(seqService.getSeq("images_sequence"));
        imageRepository.save(image);
        return "Created image with id: " + image.getId();
    }

    //FIND ALL
    @GetMapping("/image")
    public List<Image> getImages(){
        return imageRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/image/{id}")
    public Optional<Image> getImage(@PathVariable int id){
        return imageRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/image/{id}")
    public String deleteImage(@PathVariable int id){
        imageRepository.deleteById(id);
        return "Deleted image with id: " + id;
    }


    //UPDATE
    @PutMapping("/image/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable Integer id, @RequestBody Image imageDetails){
        Image image = imageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Image does not exist with id:"+ id));

        image.setImage1(imageDetails.getImage1());
        image.setPostId(imageDetails.getPostId());

        Image updatedImage = imageRepository.save(image);
        return ResponseEntity.ok(updatedImage);
    }


    //get by PostId
    @GetMapping("/image/postid/{postid}")
    public Image getImageByPostId(@PathVariable("postid") Integer postid){
        return imageRepository.findByPostId(postid);

    }
}

