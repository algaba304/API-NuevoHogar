const {response, request} = require('express');
const Evidencia = require('../models/evidencias');

const evidenciasGet = (req, res = response) => {
    const {idR} = req.params;
    Evidencia.getAll(idR, (err, evidencias)=>{
        (err)
            ?res.status(400).send(err)
            :res.send(evidencias)
    });
}

const evidenciasDeleteOne = (req, res = response) => {
    const {idE} = req.params;

    Evidencia.deleteOneEvidence(idE, (err, result) =>{
        (err)
            ?res.status(400).send(err)
            :res.json(result);
    });
}

const evidenciasDeleteAll = (req, res = response) => {
    const {idR} = req.params;

    Evidencia.deleteAllEvidences(idR, (err, result) =>{
        (err)
            ?res.status(400).send(err)
            :res.json(result);
    });
}

const evidenciasPost = (req, res) => {
    let data = req.body;
    console.log(data);
    Evidencia.create(data, (err, result)=>{
        (err)
            ?res.status(400).send(err)
            :res.send(result);
    });
}
  
module.exports = {
    evidenciasGet,
    evidenciasDeleteOne,
    evidenciasDeleteAll,
    evidenciasPost
  };