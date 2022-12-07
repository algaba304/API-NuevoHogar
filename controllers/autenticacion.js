const Usuario = require('../models/usuarios');

const autenticarUsuario = async (req, res) => {

    return await new Promise((resolve, reject) => {
            
        validarAutenticacion(req, res, (err, usuario) => {

            if(err) return res.status(401).send({mensaje:err});

            resolve(usuario);
            
        });

    });

}

const validarAutenticacion = async (req, res, callback) => {

    const autorizacion = req.headers.authorization;
  
    if(!autorizacion) return callback("No estas autenticado", null);
  
    const desencriptado = new Buffer.from(autorizacion.split(' ')[1], 'base64').toString().split(':');
    const usuario = desencriptado[0];
    const contrasenia = desencriptado[1];

    const usuarioAutenticado = await getUsuarioAutenticado(res, usuario);
    
    if(usuarioAutenticado === null) return callback("El usuario no existe", null);

    if(contrasenia !== usuarioAutenticado.contrasenia) return callback("Contraseña incorrecta", null);

    return callback(null, usuarioAutenticado);

}

const getUsuarioAutenticado = async (res, nombreUsuario) => {

    const bandera = 2;

    try{

        return await new Promise((resolve, reject) => {
      
            Usuario.getUsuarioPorNombreDeUsuario(bandera, nombreUsuario, (err, usuario) => {
        
                if(err) return res.status(500).send({mensaje:"Ocurrio un error inesperado"});

                if(usuario !== null) resolve(usuario[0]);

                if(usuario === null) resolve(usuario);
          
            });
        
        });

    }catch(err){

        console.log(err);
        return res.status(500).send(err);

    }
  
}

module.exports = {
    autenticarUsuario
}