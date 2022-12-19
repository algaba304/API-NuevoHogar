const EnlaceDonacion = require('../models/enlaceDonacion');
const EnlaceRedSocial = require('../models/enlaceRedSocial');
const Usuario = require('../models/usuarios');
const error500 = "Ocurrió un error inesperado";

const getUsuarioPorId = async (res, id) => {

    return await new Promise((resolve, reject) => {
        
        Usuario.getUsuarioPorId(id, (err, usuario) => {
            
            if(err) return res.status(500).send({ 

                mensaje : error500 

            });
            
            if(usuario !== null) resolve(usuario[0]);
    
            if(usuario === null) resolve(usuario);
    
        });
  
    });
  
}

const getUsuarioPorCorreo = async (res, correoElectronico) => {

    return await new Promise((resolve, reject) => {

        Usuario.getUsuarioPorCorreo(correoElectronico, (err, usuario) => {

            if(err) return res.status(500).send({ 

                mensaje : error500 

            });

            if(usuario !== null) resolve(usuario[0]);

            if(usuario === null) resolve(usuario);

        });

    });

}

const getUsuarioPorNombreDeUsuario = async (res, nombreUsuario) => {

    return await new Promise((resolve, reject) => {

        const bandera = 2;
        
        Usuario.getUsuarioPorNombreDeUsuario(bandera, nombreUsuario, (err, usuario) => {

            if(err) return res.status(500).send({ 

                mensaje : error500

            });
            
            if(usuario !== null) resolve(usuario[0]);

            if(usuario === null) resolve(usuario);

        });

    });

}

const getEnlaceBuscado = async (res, idEnlaceDonacion) => {

    return await new Promise((resolve, reject) => {
       
        EnlaceDonacion.buscarEnlace(idEnlaceDonacion, (err, enlace) => {

            if(err) return res.status(500).send({ 

                mensaje : error500

            });

            if(enlace !== null) resolve(enlace[0]);

            if(enlace === null) resolve(enlace);

        });

    });

}

const getMetodoBuscado = async (res, idEnlaceRedSocial) => {

    return await new Promise((resolve, reject) => {
        
        EnlaceRedSocial.buscarEnlace(idEnlaceRedSocial, (err, enlace) => {
            
            if(err) return res.status(500).send({ 

                mensaje : error500

            });

            if(enlace !== null) resolve(enlace[0]);

            if(enlace === null) resolve(enlace);

        });

    });

}



module.exports = {

    getUsuarioPorId,
    getUsuarioPorCorreo,
    getUsuarioPorNombreDeUsuario,
    getEnlaceBuscado,
    getMetodoBuscado
    
};