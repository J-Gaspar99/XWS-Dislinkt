package com.dislinkt.message;


import com.dislinkt.message.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private SequencerService seqService;
    //CREATE
    @PostMapping("/message")
    public String createMessage(@RequestBody Message message){
        //generate sequence
        message.setId(seqService.getSeq("messages_sequence"));
        messageRepository.save(message);
        return "Created message with id: " + message.getId();
    }

    //FIND ALL
    @GetMapping("/message")
    public List<Message> getMessages(){
        return messageRepository.findAll();
    }

    //FIND BY ID
    @GetMapping("/message/{id}")
    public Optional<Message> getMessage(@PathVariable int id){
        return messageRepository.findById(id);
    }

    //DELETE
    @DeleteMapping("/message/{id}")
    public String deleteMessage(@PathVariable int id){
        messageRepository.deleteById(id);
        return "Deleted message with id: " + id;
    }



    //UPDATE
    @PutMapping("/message/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable int id, @RequestBody Message messageDetails){
        Message message = messageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message does not exist with id:"+ id));

        message.setSenderId(messageDetails.getSenderId());
        message.setSenderUserName(messageDetails.getSenderUserName());

        message.setReceiverId(messageDetails.getReceiverId());
        message.setReceiverUserName(messageDetails.getReceiverUserName());
        message.setText(messageDetails.getText());
        message.setTime(messageDetails.getTime());
        message.setChatId(messageDetails.getChatId());
        message.setSeen(messageDetails.getSeen());



        Message updatedMessage = messageRepository.save(message);
        return ResponseEntity.ok(updatedMessage);
    }




    //get by senderid and receiverid
    @GetMapping("/message/senderId/receiverId/{senderId}/{receiverId}")
    public List<Message> getAllUsersBySenderIdAndReceiverId(@PathVariable("senderId") Integer senderId,@PathVariable("receiverId") Integer receiverId)
    {return messageRepository.findBySenderIdAndReceiverId(senderId,receiverId);
    }

    //get by chatId
    @GetMapping("/message/chatId/{chatId}")
    public List<Message> getAllUsersByChatter(@PathVariable("chatId") Integer chatId)
    {return messageRepository.findByChatId(chatId);
    }




}

