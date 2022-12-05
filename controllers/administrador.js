const {response, request} = require('express');
const Usuario = require('../models/usuarios');

const error404 = "Recurso inexistente";
const error500 = "Ocurrión un error inesperado";

const getListaRefugios = async (req = request, res = response) => {

    const {id} = req.params;
    const bandera = 1;

    await getListaGenerica(res, id, bandera);

}

const getListaUsuariosReportados = async (req = request, res = response) => {

    const {id} = req.params;
    const bandera = 2;

    await getListaGenerica(res, id, bandera);

}

const getListaGenerica = async (res, id, bandera) => {

    try{

        const usuarioEncontrado = await new Promise((resolve, reject) => {
            
            Usuario.getUsuarioPorId(id, (err, usuario) => {

                (err)
                    ?reject(err)
                    :resolve(usuario);

            });

        });

        if(usuarioEncontrado.errno > 0) return res.status(500).send({mensaje:error500});

        if(usuarioEncontrado !== null){

            if(usuarioEncontrado[0].idRol !== "AD_123_R") return res
                .status(404).send({mensaje:error404});

        }else{

            return res.status(404).send({mensaje:error404});

        }

        const listaObtenida = await new Promise((resolve, reject) => {
            
            Usuario.getListaUsuarios(bandera, (err, lista) => {

                (err)
                    ?reject(err)
                    :resolve(lista);

            });

        });

        if(listaObtenida !== null){

            if(listaObtenida.errno > 0) return res.status(500).send({mensaje:error500});

            return res.status(200).send(listaObtenida);

        }

        return res.status(204).send();

    }catch(err){

        console.log(err);
        return res.status(500).send(err);

    }

}

module.exports = {
    getListaRefugios,
    getListaUsuariosReportados
}