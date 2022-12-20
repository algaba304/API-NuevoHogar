const {response, request} = require('express');
const Evidencia = require('../models/evidencias');

const evidenciasGet = (req, res = response) => {
    const {idR} = req.params;
    Evidencia.getAll(idR, (err, evidencias)=>{
        (err)
            ?res.send(err)
            :res.send(evidencias)
    });
}

const evidenciasDeleteOne = (req, res = response) => {
    const {idE} = req.params;

    Evidencia.deleteOneEvidence(idE, (err, result) =>{
        (err)
            ?res.send(err)
            :res.json(result);
    });

    /*const result1 = new Promise((res, rej) => {
        Evidencia.deleteOneEvidence(idE, (err, result) => {
            return (err)
                ? rej(err)
                : res(result);
        });
    });
    
    if(result1.affectedRows === 1){
        return res.status(200).send("Evidencia eliminada");
    }*/
}

const evidenciasDeleteAll = (req, res = response) => {
    const {idR} = req.params;

    Evidencia.deleteAllEvidences(idR, (err, result) =>{
        (err)
            ?res.send(err)
            :res.json(result);
    });


   /* const result1 = new Promise((res, rej) => {
        Evidencia.deleteAllEvidences(idR, (err, result) => {
            return (err)
                ? rej(err)
                : res(result);
        });
    });
    
    if(result1.affectedRows >= 1){
        return res.status(200).send("Evidencias eliminadas");
    }*/
}

const evidenciasPost = (req, res) => {
    let data = req.body;
    console.log(data);
    Evidencia.create(data, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}
  
module.exports = {
    evidenciasGet,
    evidenciasDeleteOne,
    evidenciasDeleteAll,
    evidenciasPost
  };