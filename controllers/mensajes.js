const {response, request} = require('express');
const Mensaje = require('../models/mensajes');

const mensajesGetLastMessage = (res = response) => {
   Mensaje.getLastMessage((err, escuelas)=>{
        (err)
            ?res.send(err)
            :res.send(escuelas)
    });
}

const mensajesGetLastMessages = (res = response) => {
    Mensaje.getLastMessages((err, escuelas)=>{
         (err)
             ?res.send(err)
             :res.send(escuelas)
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
    const {id} = req.params;

    const result1 = new Promise((res, rej) => {
        Mensaje.deleteById(id, (err, result) => {
            return (err)
                ? rej(err)
                : res(result);
        });
    });

    if(result1.affectedRows === 1){
        return res.status(200).send("Mensaje eliminado");
    }
}

const mensajesDeleteAll = (req, res = response) => {
    const {id} = req.params;

    const result1 = new Promise((res, rej) => {
        Mensaje.deleteAllChatMessages(id, (err, result) => {
            return (err)
                ? rej(err)
                : res(result);
        });
    });

    if(result1.affectedRows >= 1){
        return res.status(200).send("Mensajes eliminados");
    }
}
  
module.exports = {
    mensajesGetLastMessage,
    mensajesGetLastMessages,
    mensajesPost,
    mensajesDeleteOne,
    mensajesDeleteAll
};