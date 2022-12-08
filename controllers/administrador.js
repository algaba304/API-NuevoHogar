const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const { autenticarUsuario } = require('../controllers/autenticacion');
const { editarAccesoGenerico } = require('../controllers/autorizacion');
const { getUsuarioPorId } = require('../controllers/busquedas');
const { validarEntradaEstadoUsuario } = require('./validaciones');

const error404 = "Recurso inexistente";
const error500 = "Ocurrión un error inesperado";

const getListaRefugios = async (req = request, res = response) => {

    const { id } = req.params;
    const bandera = 1;
    const usuarioAutenticado = await autenticarUsuario(req, res);

    await getListaGenerica(res, id, bandera, usuarioAutenticado);

}

const getListaUsuariosReportados = async (req = request, res = response) => {

    const { id } = req.params;
    const bandera = 2;
    const usuarioAutenticado = await autenticarUsuario(req, res);

    await getListaGenerica(res, id, bandera, usuarioAutenticado);

}

const getListaGenerica = async (res, id, bandera, usuarioAutenticado) => {

    const usuarioEncontrado = await getUsuarioPorId(res, id);

    if(usuarioEncontrado !== null){

        if(usuarioEncontrado.idRol !== "AD_123_R") return res
        .status(404).send({mensaje:error404});

    }else{

        return res.status(404).send({mensaje:error404});

    }

    if(usuarioAutenticado.idRol === "AD_123_R"){

        const listaObtenida = await new Promise((resolve, reject) => {
        
            Usuario.getListaUsuarios(bandera, (err, lista) => {

                if(err) return res.status(500).send({mensaje:error500});

                resolve(lista);

            });

        });

        if(listaObtenida !== null){

            return res.status(200).send(listaObtenida);

        }

        return res.status(204).send();

    }

    return res.status(401).send({ mensaje:"El usuario no tiene permiso para consultar" });

}

const editarSolicitudRefugio = async (req = request, res = response) => {

    const { id } = req.params;
    let data = req.body;

    if(JSON.stringify(data) === '{}'){

        return res.status(400).send({ mensaje:"Necesita registrar información" });

    }

    var { estadoUsuario } = req.body;
    estadoUsuario = estadoUsuario.trim();

    const usuarioEncontrado = await getUsuarioPorId(res, id);
    
    if(usuarioEncontrado !== null) {
        
        if(usuarioEncontrado.idRol === "AD_123_R" || usuarioEncontrado.idRol === "AN_123_R") return res
        .status(404).send({ mensaje:error404 });

        if(usuarioEncontrado.idRol === "RF_123_R") {

            if(usuarioEncontrado.estadoUsuario !== "En espera") return res.status(404).send({ mensaje:error404 });

        }

    }else{

        return res.status(404).send({ mensaje:error404 });

    }

    const usuarioAutenticado = await autenticarUsuario(req, res);
    const mensajeValidacion = await validarEntradaEstadoUsuario(estadoUsuario);

    if(mensajeValidacion !== null) return res.status(400).send({ mensaje:mensajeValidacion });
    
    if(usuarioAutenticado.idRol === "AD_123_R"){

        if(estadoUsuario === "Aceptado"){

            return await editarAccesoGenerico(res, id, estadoUsuario);
    
        }else{

            return res.status(400).send({ mensaje:"El estado ingresado debe ser 'Aceptado" });
    
        }

    }

    return res.status(401).send({ mensaje:"No tiene permiso para realizar este cambio" });

}

const bloquearUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    let data = req.body;

    if(JSON.stringify(data) === '{}'){

        return res.status(400).send({ mensaje:"Necesita registrar información" });

    }
    
    var { estadoUsuario } = req.body;
    estadoUsuario = estadoUsuario.trim();
    /*
    const resultado = await new Promise((resolve, reject) => {
        Usuario.editarAccesoDeUsuario(id, estadoUsuario, (err, result) => {
            if(err) return res.status(500).send("Ocurrio un error inesperado");
            resolve(result);
        });
    });
    if(resultado.affectedRows === 1){
        return res.status(200).send("OK");
    }else{
        return res.status(500).send("Ocurrio un error inesperado");
    }
    */
    const usuarioEncontrado = await getUsuarioPorId(res, id);
    
    if(usuarioEncontrado !== null) {
        
        if(usuarioEncontrado.idRol === "AD_123_R") return res.status(404).send({ mensaje:error404 });

        if(usuarioEncontrado.estadoUsuario !== "Aceptado") return res.status(404).send({ mensaje:error404 });

    }else{

        return res.status(404).send({ mensaje:error404 });

    }

    const usuarioAutenticado = await autenticarUsuario(req, res);
    const mensajeValidacion = await validarEntradaEstadoUsuario(estadoUsuario);

    if(mensajeValidacion !== null) return res.status(400).send({ mensaje:mensajeValidacion });
    
    if(usuarioAutenticado.idRol === "AD_123_R"){

        if(estadoUsuario === "Bloqueado"){

            return await editarAccesoGenerico(res, id, estadoUsuario);
    
        }else{
    
            return res.status(400).send({ mensaje:"El estado ingresado debe ser 'Bloqueado'" });
    
        }

    }

    return res.status(401).send({ mensaje:"No tiene permiso para realizar este cambio" });

}

module.exports = {
    getListaRefugios,
    getListaUsuariosReportados,
    bloquearUsuario,
    editarSolicitudRefugio
}