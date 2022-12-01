const {response, request} = require('express');
const Usuario = require('../models/usuarios');

const getListaRefugios = (req = request, res = response) => {

    const bandera = 1;

    try{

        Usuario.getListaUsuarios(bandera, (err, lista) => {

            if(err) return res.status(500).send("Ocurrió un error inesperado");

            if(lista !== null) return res.status(200).send(lista);

            return res.status(204).send();
        })

    }catch(err){

        console.log(err);
        return res.status(500).send(err);

    }

}

module.exports = {
    getListaRefugios
}