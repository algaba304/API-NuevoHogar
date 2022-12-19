const {response, request} = require('express');
const Participante = require('../models/participantes');

const chatsGetChatParticipants = (req, res) => {
    const {idC} = req.params;
    Participante.getChatParticipants(idC, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}

const chatsAddParticipant = (req, res) => {
    let data = req.body;
    console.log(data);
    Participante.addParticipant(data, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}

const chatsDeleteParticipant = (req, res = response) => {
    let data = req.body;
    console.log(data);

    Participante.deleteParticipant(data, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}

const chatsDeleteAllParticipants = (req, res = response) => {
    const {idC} = req.params;

    Participante.deleteAllParticipants(idC, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}

module.exports = {
    chatsGetChatParticipants,
    chatsAddParticipant,
    chatsDeleteParticipant,
    chatsDeleteAllParticipants
};