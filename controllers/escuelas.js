const {response, request} = require('express');
const Escuela = require('../models/escuelas');

const escuelasGet = (req, res = response) => {
    Escuela.getAll((err, escuelas)=>{
        (err)
            ?res.send(err)
            :res.send(escuelas)
    });
}

const escuelasGetById = (req, res = response) => {
    const {id} = req.params;
    Escuela.getById(id, (err, escuela) => {
        (err)
            ?res.send(err)
            :res.json(escuela)
    });
}

//método para crear registro escuela
const escuelasPost = (req, res) => {
    let data = req.body;
    console.log(data);
    Escuela.create(data, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}

//método para modificar escuela
const escuelasPut = (req, res = response) => {
    const {id} = req.params;
    let data = req.body;
    console.log(data);
    Escuela.update(id, data, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}


const escuelasDelete = async (req, res = response) => {
    const {id} = req.params;
    const result1 = await new Promise((res, rej) => {
        Escuela.deleteEscuelaInforme(id, (err, result) => {
            return (err)
                ? rej(err)
                : res(result);
        });
    });
    const result2 = await new Promise((res, rej) => {
        Escuela.delete(id, (err, result) => {
            return (err)
                ? rej(err)
                : res(result);
        });
    });
    if(result1.affectedRows === 1 && result2.affectedRows === 1){
        return res.status(200).send("Escuela eliminada");
    }else if(result1.affectedRows === 0 && result2.affectedRows === 0){
        return res.status(409).send("Escuela inexistente");
    }
}
  
module.exports = {
    escuelasGet,
    escuelasGetById,
    escuelasPost,
    escuelasPut,
    escuelasDelete
  };