package com.dislinkt.block;


import com.dislinkt.block.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BlockController {

    @Autowired
    private BlockRepository blockRepository;

    @Autowired
    private SequencerService seqService;
    //CREATE
    @PostMapping("/block")
    public String createBlock(@RequestBody Block block){
        //generate sequence
        block.setId(seqService.getSeq("blocks_sequence"));
        blockRepository.save(block);
        return "Created block with id: " + block.getId();
    }

    //FIND ALL
    @GetMapping("/block")
    public List<Block> getBlocks(){
        return blockRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/block/{id}")
    public Optional<Block> getBlock(@PathVariable int id){
        return blockRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/block/{id}")
    public String deleteBlock(@PathVariable int id){
        blockRepository.deleteById(id);
        return "Deleted block with id: " + id;
    }



    //UPDATE
    @PutMapping("/block/{id}")
    public ResponseEntity<Block> updateBlock(@PathVariable int id, @RequestBody Block blockDetails){
        Block block = blockRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Block does not exist with id:"+ id));

        block.setBlockerId(blockDetails.getBlockerId());
        block.setBlockedId(blockDetails.getBlockedId());
        block.setBlockerUserName(blockDetails.getBlockerUserName());
        block.setBlockedUserName(blockDetails.getBlockedUserName());




        Block updatedBlock = blockRepository.save(block);
        return ResponseEntity.ok(updatedBlock);
    }




    //get by blockerid and blockedid
    @GetMapping("/block/blockerId/blockedId/{blockerId}/{blockedId}")
    public Block getAllUsersByBlockerIdAndBlockedId(@PathVariable("blockerId") Integer blockerId, @PathVariable("blockedId") Integer blockedId)
    {
        return blockRepository.findByBlockerIdAndBlockedId(blockerId,blockedId);
    }






}

