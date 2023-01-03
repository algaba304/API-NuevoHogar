const {response, request} = require('express');
const Chat = require('../models/chat');

const chatsGetReportChat = (req, res = response) => {
    const {idR} = req.params;
    Chat.getReportChat(idR, (err, chats)=>{
         (err)
             ?res.status(400).send(err)
             :res.send(chats)
     });
 }

const  chatsGetUserChats = (req, res = response) => {
   const {idP} = req.params;
   Chat.getUserChats(idP, (err, chats)=>{
        (err)
            ?res.status(400).send(err)
            :res.send(chats)
    });
}

const chatsGetChat = (req, res = response) => {
    const {idC} = req.params;
    Chat.getById (idC, (err, chat)=>{
         (err)
             ?res.status(400).send(err)
             :res.send(chat)
     });
 }

const chatsPost = (req, res) => {
    let data = req.body;
    console.log(data);
    Chat.create(data, (err, result)=>{
        (err)
            ?res.status(400).send(err)
            :res.send(result);
    });
}

const chatsDeleteById = (req, res = response) => {
    const {idP} = req.params;

    Chat.deleteById(idP, (err, result)=>{
        (err)
            ?res.status(400).send(err)
            :res.send(result);
    });
}
  
module.exports = {
    chatsGetReportChat,
    chatsGetUserChats,
    chatsGetChat,
    chatsPost,
    chatsDeleteById
};