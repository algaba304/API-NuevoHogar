const {response, request} = require('express');
const Mensaje = require('../models/mensajes');

const mensajesGetLastMessage = (req, res = response) => {
   const {idC} = req.params;
   Mensaje.getLastMessage(idC, (err, mensaje)=>{
        (err)
            ?res.send(err)
            :res.send(mensaje)
    });
}

const mensajesGetLastMessages = (req, res = response) => {
    const {idC} = req.params;
    let data = req.body;
    console.log(data);
    Mensaje.getLastMessages(idC, data, (err, mensajes)=>{
         (err)
             ?res.send(err)
             :res.send(mensajes)
     });
 }

const mensajesPost = (req, res) => {
    let data = req.body;
    console.log(data);
    Mensaje.create(data, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}

const mensajesDeleteOne = (req, res = response) => {
    const {idC} = req.params;

    Mensaje.deleteById(idC, (err, result) =>{
        (err)
            ?res.send(err)
            :res.json(result);
    });
}

const mensajesDeleteAll = (req, res = response) => {
    const {idC} = req.params;

    Mensaje.deleteAllChatMessages(idC, (err, result) =>{
        (err)
            ?res.send(err)
            :res.json(result);
    });
}
  
module.exports = {
    mensajesGetLastMessage,
    mensajesGetLastMessages,
    mensajesPost,
    mensajesDeleteOne,
    mensajesDeleteAll
};