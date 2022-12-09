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

            if(err) return res.status(500).send({ mensaje:error500 });

            if(usuario !== null) resolve(usuario[0]);

            if(usuario === null) resolve(usuario);

        });

    });

}

const getUsuarioPorNombreDeUsuario = async (res, usuario) => {

    return await new Promise((resolve, reject) => {

        const bandera = 2;
        
        Usuario.getUsuarioPorNombreDeUsuario(bandera, usuario, (err, usuario) => {

            if(err) return res.status(500).send({ 

                mensaje : error500 

            });

            if(usuario !== null) resolve(usuario[0]);

            if(usuario === null) resolve(usuario);

        });

    });

}


module.exports = {

    getUsuarioPorId,
    getUsuarioPorCorreo,
    getUsuarioPorNombreDeUsuario
    
};