const { 
    
    request, 
    response 

} = require('../controllers/usuarios');
const EnlaceRedSocial = require('../models/enlaceRedSocial');
const EnlaceDonacion = require('../models/enlaceDonacion');
const { 

    getUsuarioPorId, 
    getEnlaceBuscado, 
    getMetodoBuscado

} = require('../controllers/busquedas');
const MetodoDonacion = require('../models/metodoDonacion');
const TipoRedSocial = require('../models/tipoRedSocial');
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

        const listaEnlacesDonacion = await new Promise((resolve, reject) => {
            
            EnlaceDonacion.getListaEnlacesDonacion(id, (err, lista) => {

                (err) ? reject(err) : resolve(lista);

            });

        });

        if(listaEnlacesDonacion !== null){

            return res.status(200).send(listaEnlacesDonacion);

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

        const listaEnlacesRedes = await new Promise((resolve, reject) => {
            
            EnlaceRedSocial.getListaRedesSociales(id, (err, lista) => {

                (err) ? reject(err) : resolve(lista);

            });

        });

        if(listaEnlacesRedes !== null){

            return res.status(200).send(listaEnlacesRedes);

        }else{

            return res.status(204).send();

        }

    }catch(err){
        
        return res.status(500).send({

            mensaje : error500
            
        });

    }

}

const getMetodosDonacion = async (req = request, res = response) => {

    try{

        const listaMetodos = await new Promise((resolve, reject) => {
            
            MetodoDonacion.getMetodos((err, lista) => {

                if(err) return res.status(500).send({

                    mensaje : error500

                });

                return resolve(lista);

            });

        });

        if(listaMetodos != null){

            return res.status(200).send(listaMetodos);

        }else{

            return res.status(204).send();

        }

    }catch(err){

        return res.status(500).send({

            mensaje : error500

        });

    }
}

const guardarMetodos = async (req = request, res = response) => {

    try{

        const { id } = req.params;
        const data = req.body;

        if(data.length != 3){

            return res.status(400).send({

                mensaje : "La cantidad de enlaces registrados no es el correcto"

            });

        }

        for(var i = 0; i < data.length; i++){

            var dataDB = data[i];
            var enlaceBuscado = await getEnlaceBuscado(res, dataDB.idEnlaceDonacion);
            
            if(enlaceBuscado == null){

                var resultadoRegistro = await new Promise((resolve, reject) => {
                    
                    EnlaceDonacion.crearEnlaceDonacion(dataDB, (err, result) => {
                        
                        if(err) return res.status(500).send({
                            
                            mensaje : error500
        
                        });

                        return resolve(result);

                    });

                });

                if(resultadoRegistro.affectedRows === 0){

                    return res.status(500).send({

                        mensaje : error500

                    });

                }

            }else{

                var resultadoEdicion = await new Promise((resolve, reject) => {
                    
                    EnlaceDonacion.editarEnlaceDonacion(id, dataDB, (err, result) => {
                        
                        if(err) return res.status(500).send({

                            mensaje : error500
        
                        });

                        return resolve(result);

                    });

                });

                if(resultadoEdicion.affectedRows === 0){
                    
                    return res.status(500).send({

                        mensaje : error500

                    });

                }

            }

        }

        return res.status(200).send({

            mensaje : "Enlaces editados exitosamente"

        });

    }catch(err){
        
        return res.status(500).send({

            mensaje : error500

        });

    }

}

const guardarRedes = async (req = request, res = response) => {

    try{

        const { id } = req.params;
        const data = req.body;

        if(data.length != 6){

            return res.status(400).send({

                mensaje : "La cantidad de enlaces registrados no es el correcto"

            });

        }

        for(var i = 0; i < data.length; i++){

            var dataDB = data[i];
            var enlaceBuscado = await getMetodoBuscado(res, dataDB.idEnlaceRedSocial);
            
            if(enlaceBuscado == null){

                var resultadoRegistro = await new Promise((resolve, reject) => {
                    
                    EnlaceRedSocial.crearEnlaceRedSocial(dataDB, (err, result) => {
                        
                        if(err) return res.status(500).send({
                            
                            mensaje : error500
        
                        });

                        return resolve(result);

                    });

                });

                if(resultadoRegistro.affectedRows === 0){

                    return res.status(500).send({

                        mensaje : error500

                    });

                }

            }else{

                var resultadoEdicion = await new Promise((resolve, reject) => {
                    
                    EnlaceRedSocial.editarEnlaceRedSocial(id, dataDB, (err, result) => {
                        
                        if(err) return res.status(500).send({

                            mensaje : error500
        
                        });

                        return resolve(result);

                    });

                });

                if(resultadoEdicion.affectedRows === 0){
                    
                    return res.status(500).send({

                        mensaje : error500

                    });

                }

            }

        }

        return res.status(200).send({

            mensaje : "Enlaces editados exitosamente"

        });

    }catch(err){
        
        return res.status(500).send({

            mensaje : error500

        });

    }

}

const getTiposRed = async (req = request, res = response) => {

    try{

        const listaTipos = await new Promise((resolve, reject) => {
            
            TipoRedSocial.getRedes((err, lista) => {

                if(err) return res.status(500).send({

                    mensaje : error500

                });

                return resolve(lista);

            });

        });

        if(listaTipos != null){

            return res.status(200).send(listaTipos);

        }else{

            return res.status(204).send();

        }

    }catch(err){

        return res.status(500).send({

            mensaje : error500

        });

    }

}

module.exports = {

    consultarListaEnlacesDonacion,
    consultarListaRedesSociales,
    getMetodosDonacion,
    guardarMetodos,
    guardarRedes,
    getTiposRed

};