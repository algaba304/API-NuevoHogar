const {response} = require('express');

const usuariosGet = (req, res = response) => {

  const{q, nombre = 'no name', apikey, page = 1, limit} = req.query;

    res.json({
        msg:" api GET desde controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
  }

  const usuariosPost = (req, res = response) => {

    const{nombre, edad} = req.body;

    res.json({
        msg:" api POST desde controlador",
        nombre,
        edad
    });
  }
  const usuariosPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg:" api PUT desde controlador",
        id
    });
  }
  const usuariosPatch = (req, res = response) => {
    res.json({
        msg:" api PATCH desde controlador"
    });
  }

  const usuauriosDelete = (req, res = response) => {
    res.json({
        msg:" api DELETE desde controlador"
    });
  }

  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuauriosDelete
};