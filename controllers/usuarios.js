const {response, request} = require('express');
const Usuario = require('../models/usuarios');

const error404 = "Recurso inexistente";
const error500 = "Ocurrión un error inesperado";

const crearUsuario = async (req = request, res = response) => {

  let data = req.body;
  data.idRol = `${req.body.idRol.idRol}`;

  if(!data.idUsuario || data.idUsuario.trim() == "") return res
    .status(400).send({mensaje:"El id del usuario esta vacío"});

  const mensajeValidacion = await new Promise((resolve, reject) => {

    var mensaje = Usuario.validarCamposVacios(data);

    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarTipoDeDato(data);

    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarTipoDeDatoContadorReportes(data.contadorReportes);

    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarLimites(data);

    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarLimiteContadorReportes(data.contadorReportes);

    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarContrasenia(data.contrasenia);

    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarFecha(data.fechaNacimiento);

    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarTelefono(data.numeroTelefono);

    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarTipoUsuario(data.estadoUsuario, data.idRol);

    if(mensaje) return resolve(mensaje);

    return resolve(null);

  });

  if(mensajeValidacion !== null) return res.status(409).send({mensaje:mensajeValidacion});

  const mensajeValidacionCorreo = await new Promise((resolve, reject) => {

    return resolve(Usuario.validarCorreo(data.correoElectronico));
    
  });
  
  if(mensajeValidacionCorreo.valid === false) return res
    .status(400).send({mensaje:"El correo no es válido"});

  try{

    var usuarioEncontrado = await new Promise((resolve, reject) => {
      
      Usuario.getUsuarioPorId(data.idUsuario, (err, usuario) => {

        (err)
          ?reject(err)
          :resolve(usuario);

      });

    });

    if(usuarioEncontrado !== null){

      if(usuarioEncontrado[0].idUsuario) return res
        .status(409).send({mensaje:"Usuario ya registrado"});

    }

    usuarioEncontrado = await new Promise((resolve, reject) => {

      Usuario.getUsuarioPorCorreo(data.correoElectronico, (err, usuario) => {

        return (err)
          ?reject(err)
          :resolve(usuario);

      });

    });

    if(usuarioEncontrado !== null){

      if(usuarioEncontrado[0].correoElectronico) return res
        .status(409).send({mensaje:"El correo ya está registrado"});

    }

    usuarioEncontrado = await new Promise((resolve, reject) => {

      const bandera = 1;
      
      Usuario.getUsuarioPorNombreDeUsuario(bandera, data.usuario, (err, usuario) => {

        (err)
          ?reject(err)
          :resolve(usuario);

      });

    });

    if(usuarioEncontrado !== null){

      if(usuarioEncontrado[0].usuario) return res
        .status(409).send({mensaje:"El nombre de usuario ya está registrado"});

    }

    const resultadoRegistro = await new Promise((resolve, reject) => {
      
      Usuario.crearUsuario(data, (err, result) => {

        (err)
          ?reject(err)
          :resolve(result);

      });

    });

    if(resultadoRegistro.affectedRows === 1){

      return res.status(200).send({mensaje:"Se agregó el usuario exitosamente"});

    }else{

      return res.status(500).send({mensaje:"Ocurrió un error inesperado"});

    }

  }catch(err){

    console.log(err);
    return res.status(500).send(err);

  }

}

const editarAccesoDeUsuario = async (req = request, res = response) => {

  const {id} = req.params;
  const {estadoUsuario} = req.body;

  try{

    const usuarioEncontrado = await new Promise((resolve, reject) => {
      
      Usuario.getUsuarioPorId(id, (err, usuario) => {

        (err)
          ?reject(err)
          :resolve(usuario);

      });

    });

    if(usuarioEncontrado.errno > 0) return res.status(500).send({mensaje:error500});

    if(usuarioEncontrado !== null) {
      
      if(usuarioEncontrado[0].idRol === "AD_123_R") return res
        .status(404).send({mensaje:error404});

    }else{

      return res.status(404).send({mensaje:error404})

    }

    //falta validar que sea el administrador
    if(usuarioEncontrado[0].idRol === "RF_123_R" && estadoUsuario.trim() === "Aceptado"){

      if(usuarioEncontrado[0].estadoUsuario === "En espera"){

        return await editarAccesoGenerico(res, id, estadoUsuario.trim());

      }else{

        return res.status(409).send({mensaje:"Busca un refugio que tenga el estado 'En espera' para aceptarlo"});

      }

    }else if(estadoUsuario.trim() === "Bloqueado"){

      if(usuarioEncontrado[0].estadoUsuario === "Aceptado"){

        return await editarAccesoGenerico(res, id, estadoUsuario.trim());

      }else{

        return res.status(409).send({mensaje:"Busca un usuario que tenga el estado 'Aceptado' para bloquearlo"});

      }

    }else if(usuarioEncontrado[0].idRol === "RF_123_R" && estadoUsuario === "En espera"){

      return res.status(400).send({mensaje:"El refugio no puede recibir este estado"});

    }
    
    return res.status(400).send({mensaje:"El animalista no puede recibir el estado 'Aceptado' o 'En espera'"});

  }catch(err){

    console.log(err);
    return res.status(500).send(err);

  }

}

const editarAccesoGenerico = async (res, id, estadoUsuario) => {

  try{

    const resultadoRegistro = await new Promise((resolve, reject) => {

      Usuario.editarAcceso(id, estadoUsuario, (err, result) => {
  
        (err)
          ?reject(err)
          :resolve(result);
  
      });
  
    });
  
    if(resultadoRegistro.affectedRows === 1){
  
      return res.status(200).send({mensaje:"Se editó el usuario exitosamente"});
  
    }else{
  
      return res.status(500).send({mensaje:"Ocurrió un error inesperado"});
  
    }

  }catch(err){

    console.group(err);
    return res.status(500).send({mensaje:error500});

  }

}

const editarUsuarioReportado = async (req = request, res = response) => {

  const {id} = req.params;
  var {contadorReportes} = req.body;

  const mensajeValidacionContadorReportes = await new Promise((resolve, reject) => {
    
    var mensaje = Usuario.validarCampoVacioContadorReportes(contadorReportes);

    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarTipoDeDatoContadorReportes(contadorReportes);
    
    if(mensaje) return resolve(mensaje);

    mensaje = Usuario.validarLimiteContadorReportes(contadorReportes);

    if(mensaje) return resolve(mensaje);

    resolve(null);

  });

  if(mensajeValidacionContadorReportes !== null){

    return res.status(400).send({mensaje:mensajeValidacionContadorReportes});

  }

  try{

    const contadorAnterior = await new Promise((resolve, reject) => {
      
      Usuario.getContadorReportes(id, (err, contador) => {

        (err)
          ?reject(err)
          :resolve(contador);

      });

    });

    if(contadorAnterior !== null){

      const contadorEsperado = contadorAnterior[0].contadorReportes + 1;

      if(contadorEsperado !== contadorReportes) contadorReportes = contadorEsperado;

    }else{

      contadorReportes = 1;

    }

    const resultadoRegistro = await new Promise((resolve, reject) => {
      
      Usuario.editarUsuarioReportado(id, contadorReportes, (err, result) => {

        (err)
          ?reject(err)
          :resolve(result);
    
      });

    });

    if(resultadoRegistro.affectedRows === 1){

      return res.status(200).send({mensaje:"Usuario reportado exitosamente"});

    }else{

      return res.status(500).send({mensaje:"Ocurrió un error inesperado"});

    }

  }catch(err){

    console.log(err);
    res.status(500).send(err);

  }
}

const getListaUsuarios = (req = request, res = response) => {

  const bandera = 0;

  try{

    Usuario.getListaUsuarios((err, lista) => {

      if(err){

        return res.status(500).send("Ourrió un error inesperado");

      }else if(lista !== null){

        return res.status(200).send(lista);

      }else{

        return res.status(204).send();

      }
  
    });

  }catch(err){

    console.log(err);
    return res.status(500).send(err);

  }
  
}

const buscarUsuario = (req = request, res = response) => {

  const {usuario} = req.params;
  const bandera = 0;

  try{

    Usuario.getUsuarioPorNombreDeUsuario(bandera, usuario, (err, usuarioObtenido) => {

      if(err){

        return res.status(500).send("Ocurrió un error inesperado");

      }else if(usuarioObtenido !== null){

        return res.status(200).send(usuarioObtenido);

      }else{

        return res.status(204).send();

      }
  
    });

  }catch(err){

    console.log(err);
    return res.status(500).send(err);

  }

}

const getUsuarioRegistrado = (req = request, res = response) => {

  const {usuario} = req.query;
  const bandera = 2;

  try{

    Usuario.getUsuarioPorNombreDeUsuario(bandera, usuario, (err, usuarioObtenido) => {

      if(err){
  
        return res.status(500).send({mensaje:"Ocurrió un error inesperado"});
  
      }else if(usuarioObtenido !== null){
  
        return res.status(200).send(usuarioObtenido[0]);
  
      }else{
  
        return res.status(204).send();
  
      }
  
    });

  }catch(err){

    console.log(err);
    return res.status(500).send(err);

  }

}

const consultarListaEnlacesDonacion = async (req = request, res = response) => {

  const {id} = req.params;

  try{

    const usuarioEncontrado = await new Promise((resolve, reject) => {
    
      Usuario.getUsuarioPorId(id, (err, usuario) => {
  
        (err)
          ?reject(err)
          :resolve(usuario);
  
      });
  
    });
  
    if(usuarioEncontrado === null){

      return res.status(400).send({mensaje:"Recurso inexistente"});
  
    }

    if(usuarioEncontrado[0].idRol !== "RF_123_R" || usuarioEncontrado[0].estadoUsuario !== "Aceptado"){

      return res.status(400).send({mensaje:"Este usuario no tiene acceso a este recurso"});

    }

    const resultadoRegistro = await new Promise((resolve, reject) => {
        
      Usuario.getListaEnlacesDonacion(id, (err, lista) => {

        (err)
          ?reject(err)
          :resolve(lista);

      });

    });

    if(resultadoRegistro !== null){

        return res.status(200).send(resultadoRegistro);

    }else{

      return res.status(204).send();

    }

  }catch(err){

    console.log(err);
    return res.status(500).send(err);

  }

}

const consultarListaRedesSociales = async (req = request, res = response) => {

  const {id} = req.params;

  try{

    const usuarioEncontrado = await new Promise((resolve, reject) => {
    
      Usuario.getUsuarioPorId(id, (err, usuario) => {
  
        (err)
          ?reject(err)
          :resolve(usuario);
  
      });
  
    });
  
    if(usuarioEncontrado === null){

      return res.status(400).send({mensaje:"Recurso inexistente"});
  
    }

    if(usuarioEncontrado[0].idRol !== "RF_123_R" || usuarioEncontrado[0].estadoUsuario !== "Aceptado"){

      return res.status(400).send({mensaje:"Este usuario no tiene acceso a este recurso"});

    }

    const resultadoRegistro = await new Promise((resolve, reject) => {
        
      Usuario.getListaRedesSociales(id, (err, lista) => {

        (err)
          ?reject(err)
          :resolve(lista);

      });

    });

    if(resultadoRegistro !== null){

        return res.status(200).send(resultadoRegistro);

    }else{

      return res.status(204).send();

    }

  }catch(err){

    console.log(err);
    return res.status(500).send(err);

  }

}

  const usuauriosDelete = (req = request, res = response) => {
    const {id} = req.params;
    Usuario.borrar(id, (err, result)=>{
      (err)?res.send(err):res.send(result);
    });
  }

module.exports = {
  crearUsuario,
  editarUsuarioReportado,
  editarAccesoDeUsuario,
  getListaUsuarios,
  buscarUsuario,
  getUsuarioRegistrado,
  consultarListaEnlacesDonacion,
  consultarListaRedesSociales,
  usuauriosDelete
};