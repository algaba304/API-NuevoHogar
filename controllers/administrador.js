const { 

    response, 
    request 

} = require('express');
const Usuario = require('../models/usuarios');
const { editarAccesoGenerico } = require('../controllers/autorizacion');
const { getUsuarioPorId } = require('../controllers/busquedas');
const error404 = "Recurso inexistente";
const error500 = "Ocurrión un error inesperado";
const idRolAdministrador = "AD_123_R";
const idRolAnimalista = "AN_123_R";
const idRolRefugio = "RF_123_R";
const estadoAceptado = "Aceptado";

const getListaRefugios = async (req = request, res = response) => {

    try{

        const { id } = req.params;
        const bandera = 1;
        await getListaGenerica(res, id, bandera);

    }catch(err){

        return res.status(500).send({

            mensaje : error500

        });

    }

}

const getListaUsuariosReportados = async (req = request, res = response) => {

    try{

        const { id } = req.params;
        const bandera = 2;
        await getListaGenerica(res, id, bandera);

    }catch(err){

        return res.status(500).send({

            mensaje : error500

        });

    }

}

const getListaGenerica = async (res, id, bandera) => {

    try{

        const usuarioEncontrado = await getUsuarioPorId(res, id);

        if(usuarioEncontrado !== null){

            if(usuarioEncontrado.idRol !== idRolAdministrador) return res.status(404).send({
                
                mensaje : error404
            
            });

        }else{

            return res.status(404).send({
                
                mensaje : error404
            
            });

        }

        const listaObtenida = await new Promise((resolve, reject) => {
            
            Usuario.getListaUsuarios(bandera, (err, lista) => {

                if(err) return res.status(500).send({
                    
                    mensaje : error500
                
                });

                resolve(lista);

            });

        });

        if(listaObtenida !== null){

            return res.status(200).send(listaObtenida);

        }

        return res.status(204).send();

    }catch(err){

        return res.status(500).send({

            mensaje : error500

        });

    }

}

const editarSolicitudRefugio = async (req = request, res = response) => {

    try{

        const { id } = req.params;
        var { estadoUsuario } = req.body;
        estadoUsuario = estadoUsuario.trim();
        const usuarioEncontrado = await getUsuarioPorId(res, id);
        
        if(usuarioEncontrado !== null) {
            
            if(usuarioEncontrado.idRol === idRolAdministrador || 
                usuarioEncontrado.idRol === idRolAnimalista) return res.status(404).send({ 

                mensaje : error404 
            
            });

            if(usuarioEncontrado.idRol === idRolRefugio) {

                if(usuarioEncontrado.estadoUsuario !== "En espera") return res.status(404).send({ 
                    
                    mensaje : error404 
                
                });

            }

        }else{

            return res.status(404).send({ 
                
                mensaje : error404 
            
            });

        }
        
        const mensajeValidacion = Usuario.validarEntradaEstadoUsuario(estadoUsuario);

        if(mensajeValidacion !== null) return res.status(400).send({ 
            
            mensaje : mensajeValidacion 
        
        });
        
        if(estadoUsuario === estadoAceptado){

            return await editarAccesoGenerico(res, id, estadoUsuario);

        }else{

            return res.status(400).send({ 
                
                mensaje : "El estado ingresado debe ser 'Aceptado'" 
            
            });

        }

    }catch(err){

        return res.status(500).send({

            mensaje : error500

        });
    }

}

const bloquearUsuario = async (req = request, res = response) => {

    try{

        const { id } = req.params;
        var { estadoUsuario } = req.body;
        estadoUsuario = estadoUsuario.trim();
        const usuarioEncontrado = await getUsuarioPorId(res, id);
        
        if(usuarioEncontrado !== null) {
            
            if(usuarioEncontrado.idRol === idRolAdministrador) return res.status(404).send({ 
                
                mensaje : error404 
            
            });

            if(usuarioEncontrado.estadoUsuario !== estadoAceptado) return res.status(404).send({ 
                
                mensaje : error404 
            
            });

        }else{

            return res.status(404).send({ 
                
                mensaje : error404 
            
            });

        }

        const mensajeValidacion = Usuario.validarEntradaEstadoUsuario(estadoUsuario);

        if(mensajeValidacion !== null) return res.status(400).send({ 
            
            mensaje : mensajeValidacion 
        
        });
        
        if(estadoUsuario === "Bloqueado"){

            return await editarAccesoGenerico(res, id, estadoUsuario);

        }else{

            return res.status(400).send({ 
                
                mensaje : "El estado ingresado debe ser 'Bloqueado'" 
            
            });

        }

    }catch(err){

        return res.status(500).send({

            mensaje : error500

        });

    }

}

module.exports = {

    getListaRefugios,
    getListaUsuariosReportados,
    bloquearUsuario,
    editarSolicitudRefugio
    
};