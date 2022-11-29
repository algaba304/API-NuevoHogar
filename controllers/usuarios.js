const {response, request} = require('express');
const Usuario = require('../models/usuarios');

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

const crearUsuario = async (req = request, res = response) => {

  let data = req.body;
  data.idRol = `${req.body.idRol.idRol}`;

  if(!data.idUsuario || data.idUsuario.trim() == "") return res
    .status(400).send({mensaje:"El id del usuario esta vacío"});

  const mensajeCampoVacio = await new Promise((resolve, reject) => {

    resolve(Usuario.validarCamposVacios(data));

  });

  if(mensajeCampoVacio) return res
    .status(409).send({mensaje:mensajeCampoVacio});

  const mensajeTipoDeDatoValidado = await new Promise((resolve, reject) => {
    
    resolve(Usuario.validarTipoDeDato(data));

  });

  if(mensajeTipoDeDatoValidado) return res
    .status(400).send({mensaje:mensajeTipoDeDatoValidado});

  const mensajeValidacionContrasenia = await new Promise((resolve, reject) => {
    
    resolve(Usuario.validarContrasenia(data.contrasenia));

  });

  const mensajeValidacionLimite = await new Promise((resolve, reject) => {
    
    resolve(Usuario.validarLimites(data));

  });

  if(mensajeValidacionLimite) return res
    .status(400).send({mensaje:mensajeValidacionLimite});

  if(mensajeValidacionContrasenia) return res
    .status(400).send({mensaje:mensajeValidacionContrasenia});

  const mensajeValidacionCorreo = await new Promise((resolve, reject) => {

    resolve(Usuario.validarCorreo(data.correoElectronico));
    
  });
  
  if(mensajeValidacionCorreo.valid === false) return res
    .status(400).send({mensaje:"El correo no es válido"});

  const mensajeValidacionFecha = await new Promise((resolve, reject) => {
    
    resolve(Usuario.validarFecha(data.fechaNacimiento));

  });

  if(mensajeValidacionFecha) return res
    .status(400).send({mensaje:mensajeValidacionFecha});

  const mensajeValidacionTelefono = await new Promise((resolve, reject) => {

    resolve(Usuario.validarTelefono(data.numeroTelefono));

  });
  
  if(mensajeValidacionTelefono) return res
    .status(400).send({mensaje:mensajeValidacionTelefono});
  
  const mensajeValidacionAccesoDelUsuario = await new Promise((resolve, reject) => {
    
    resolve(Usuario.validarAccesoDelUsuario(data.estadoUsuario, data.idRol));

  });

  if(mensajeValidacionAccesoDelUsuario) return res
    .status(400).send({mensaje:mensajeValidacionAccesoDelUsuario});

  try{

    const usuarioEncontrado1 = await new Promise((resolve, reject) => {
      
      Usuario.getUsuarioPorId(data.idUsuario, (err, usuario) => {

        (err)
          ?reject(err)
          :resolve(usuario);

      });

    });

    if(usuarioEncontrado1){

      if(usuarioEncontrado1[0].idUsuario) return res
        .status(409).send({mensaje:"Usuario ya registrado"});

    }

    const usuarioEncontrado2 = await new Promise((resolve, reject) => {

      Usuario.getUsuarioPorCorreo(data.correoElectronico, (err, usuario) => {

        (err)
          ?reject(err)
          :resolve(usuario);

      });

    });

    if(usuarioEncontrado2){

      if(usuarioEncontrado2[0].correoElectronico) return res
        .status(409).send({mensaje:"El correo ya esta registrado"});

    }

    const usuarioEncontrado3 = await new Promise((resolve, reject) => {
      
      Usuario.getUsuarioPorNombreDeUsuario(data.usuario, (err, usuario) => {

        (err)
          ?reject(err)
          :resolve(usuario);

      });

    });

    if(usuarioEncontrado3){

      if(usuarioEncontrado3[0].usuario) return res
        .status(409).send({mensaje:"El nombre de usuario ya esta registrado"});

    }

    const resultadoRegistro = await new Promise((resolve, reject) => {
      
      Usuario.crearUsuario(data, (err, result) => {

        (err)
          ?reject(err)
          :resolve(result);

      });

    });

    if(resultadoRegistro.affectedRows === 1) return res
      .status(200).send({mensaje:"Se agrego el usuario exitosamente"});

  }catch(err){

    console.log(err);
    return res.status(500).send(err);

  }

}

  const usuariosPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg:" api PUT desde controlador",
        id
    });
  }

  const usuauriosDelete = (req = request, res = response) => {
    const {id} = req.params;
    Usuario.borrar(id, (err, result)=>{
      (err)?res.send(err):res.send(result);
    });
  }

  module.exports = {
    usuariosGet,
    crearUsuario,
    usuariosPut,
    usuauriosDelete
};