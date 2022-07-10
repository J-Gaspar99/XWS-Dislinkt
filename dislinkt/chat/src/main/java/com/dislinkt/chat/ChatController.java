package com.dislinkt.chat;

import com.dislinkt.chat.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private SequencerService seqService;
    //CREATE
    @PostMapping("/chat")
    public String createChat(@RequestBody Chat chat){
        //generate sequence
        chat.setId(seqService.getSeq("chats_sequence"));
        chatRepository.save(chat);
        return "Created chat with id: " + chat.getId();
    }

    //FIND ALL
    @GetMapping("/chat")
    public List<Chat> getChats(){
        return chatRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/chat/{id}")
    public Optional<Chat> getChat(@PathVariable int id){
        return chatRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/chat/{id}")
    public String deleteChat(@PathVariable int id){
        chatRepository.deleteById(id);
        return "Deleted chat with id: " + id;
    }



    //UPDATE
    @PutMapping("/chat/{id}")
    public ResponseEntity<Chat> updateChat(@PathVariable int id, @RequestBody Chat chatDetails){
        Chat chat = chatRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Chat does not exist with id:"+ id));

        chat.setChatter1(chatDetails.getChatter1());
        chat.setChatter2(chatDetails.getChatter2());
        chat.setChatter1Id(chatDetails.getChatter1Id());
        chat.setChatter1Id(chatDetails.getChatter1Id());




        Chat updatedChat = chatRepository.save(chat);
        return ResponseEntity.ok(updatedChat);
    }



    //get by Chatter1Id and Chatter2Id
    @GetMapping("/chat/chatter1idchatter2id/{chatter1Id}/{chatter2Id}")
    public Chat getAllByChatter1IdAndChatter2Id(@PathVariable("chatter1Id") Integer chatter1Id,@PathVariable("chatter2Id") Integer chatter2Id)
    {
        return chatRepository.findByChatter1IdAndChatter2Id(chatter1Id,chatter2Id);
    }




}


