const { 
    
    request, 
    response 

} = require('../controllers/usuarios');
const EnlaceRedSocial = require('../models/enlaceRedSocial');
const EnlaceDonacion = require('../models/enlaceDonacion');
const { getUsuarioPorId } = require('../controllers/busquedas');
const error500 = "Ocurrió un error inesperado";
const error404 = "Recurso inexistente";
const error400 = "Este usuario no tiene acceso a este recurso";
const idRolRefugio = "RF_123_R";
const estado = "Aceptado";

const consultarListaEnlacesDonacion = async (req = request, res = response) => {

    try{

        const { id } = req.params;
        const usuarioEncontrado = await getUsuarioPorId(res, id);

        if(usuarioEncontrado.idRol !== idRolRefugio || usuarioEncontrado.estadoUsuario !== estado){

            return res.status(400).send({ 

                mensaje : error400 

            });

        }

        const resultadoRegistro = await new Promise((resolve, reject) => {
            
            EnlaceDonacion.getListaEnlacesDonacion(id, (err, lista) => {

                (err) ? reject(err) : resolve(lista);

            });

        });

        if(resultadoRegistro !== null){

            return res.status(200).send(resultadoRegistro);

        }else{

            return res.status(204).send();

        }

    }catch(err){
        
        return res.status(500).send({

            mensaje : error500

        });

    }

}

const consultarListaRedesSociales = async (req = request, res = response) => {

    try{

        const { id } = req.params;
        const usuarioEncontrado = await getUsuarioPorId(res, id);
        
        if(usuarioEncontrado === null){

            return res.status(404).send({ 

                mensaje : error404
            
            });
        
        }

        if(usuarioEncontrado.idRol !== idRolRefugio || usuarioEncontrado.estadoUsuario !== estado){

            return res.status(400).send({ 

                mensaje : error400
            
            });

        }

        const resultadoRegistro = await new Promise((resolve, reject) => {
            
            EnlaceRedSocial.getListaRedesSociales(id, (err, lista) => {

                (err) ? reject(err) : resolve(lista);

            });

        });

        if(resultadoRegistro !== null){

            return res.status(200).send(resultadoRegistro);

        }else{

            return res.status(204).send();

        }

    }catch(err){
        console.log(err);
        return res.status(500).send({

            mensaje : error500
            
        });

    }

}

module.exports = {

    consultarListaEnlacesDonacion,
    consultarListaRedesSociales

};