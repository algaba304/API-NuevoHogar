const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const { autenticarUsuario } = require('../controllers/autenticacion');
const { editarAccesoGenerico } = require('../controllers/autorizacion');
const { getUsuarioPorId, getUsuarioPorNombreDeUsuario, getUsuarioPorCorreo } = require('../controllers/busquedas');
const { 
  quitarEspaciosBlancos,
  validarEntradaEstadoUsuario,
  validarEntradasUsuarioDTO, 
  buscarInformacionRepetida 
} = require('../controllers/validaciones');

const error404 = "Recurso inexistente";
const error500 = "Ocurrión un error inesperado";
const errorJSON = "JSON irreconocible";

const crearCuenta = async (req = request, res = response) => {
  
  try{

    let data = req.body;
    data.idRol = `${ req.body.idRol.idRol }`;
    data.contadorReportes = 0;
    data = quitarEspaciosBlancos(data);

  }catch(err){

    return res.status(500).send({ mensaje:errorJSON });

  }

  try{

  }catch(err){

    return res.status(500).send({ mensaje:error500 });

  }

}

const editarCuenta = async (req = request, res = response) => {

  try{

    let data = req.body;
    const {id} = req.params;
    data.idRol = `${ req.body.idRol.idRol }`;
    data.contadorReportes = 0;
    data.idUsuario = id;
    data = await quitarEspaciosBlancos(data);
    var usuarioEncontrado = await getUsuarioPorId(res, id);
    
    if(usuarioEncontrado !== null) {
          
      if(usuarioEncontrado.idRol === "AD_123_R") return res
      .status(404).send({ mensaje:error404 });
  
    }else{
  
      return res.status(404).send({ mensaje:error404 });
  
    }
  
    const usuarioAutenticado = await autenticarUsuario(req, res);
    const mensajeValidacion = await validarEntradasUsuarioDTO(data);
    
    if(mensajeValidacion !== null) return res.status(400).send({ mensaje:mensajeValidacion });
    
    if(usuarioAutenticado.idRol !== "AD_123_R"){
  
      if(usuarioAutenticado.idUsuario === usuarioEncontrado.idUsuario && usuarioAutenticado.idUsuario === data.idUsuario){
  
        usuarioEncontrado = await getUsuarioPorNombreDeUsuario(res, data.usuario);
        
        if(usuarioEncontrado !== null){
  
          if(usuarioAutenticado.idUsuario !== usuarioEncontrado.idUsuario) return res
          .status(409).send({ mensaje:"El nombre de usuario ya esta registrado" });
  
        }
  
        usuarioEncontrado = await getUsuarioPorCorreo(res, data.correoElectronico);
  
        if(usuarioEncontrado !== null){
  
          if(usuarioAutenticado.idUsuario !== usuarioEncontrado.idUsuario) return res
          .status(409).send({ mensaje:"El correo ya esta registrado" });
  
        }
  
        const resultadoRegistro = await new Promise((resolve, reject) => {
        
          Usuario.editarUsuario(id, data, (err, result) => {
      
            if(err) return resultadoRegistro.status(500).send({ mensaje:error500 });
  
            resolve(result);
      
          });
      
        });
  
        if(resultadoRegistro.affectedRows === 1){
  
          return res.status(200).send({ mensaje:"Se editó el usuario exitosamente" });
      
        }else{
      
          return res.status(500).send({ mensaje:"Ocurrió un error inesperado" });
      
        }
  
      }
  
      return res.status(400).send({ mensaje:"Debe editar su propia cuenta" });
  
    }
  
    return res.status(401).send({ mensaje:"No tiene permiso para realizar esta edición" });
  
  }catch(err){

    return res.status(500).send({ mensaje:error500 });

  }

}
  
const eliminarCuenta = async (req = request, res = response) => {
 
  try{

    const { id } = req.params;
    var { estadoUsuario } = req.body;
    estadoUsuario = estadoUsuario.trim();
    const usuarioEncontrado = await getUsuarioPorId(res, id);

    if(usuarioEncontrado !== null) {
      
      if(usuarioEncontrado.idRol === "AD_123_R") return res.status(404).send({ mensaje:error404 });

      if(usuarioEncontrado.estadoUsuario !== "Aceptado") return res.status(404).send({ mensaje:error404 });

    }else{

      return res.status(404).send({ mensaje:error404 })

    }

    const usuarioAutenticado = await autenticarUsuario(req, res);
    const mensajeValidacion = await validarEntradaEstadoUsuario(estadoUsuario);

    if(mensajeValidacion !== null) return res.status(400).send({ mensaje:mensajeValidacion });

    if(usuarioAutenticado.idRol !== "AD_123_R"){

      if(usuarioAutenticado.idUsuario === usuarioEncontrado.idUsuario){

        if(estadoUsuario === "Eliminado"){

          return await editarAccesoGenerico(res, id, estadoUsuario);
    
        }
    
        return res.status(400).send({ mensaje:"No puede realizar este cambio" });

      }

      return res.status(400).send({ mensaje:"Debe eliminar su propia cuenta" })

    }

    return res.status(401).send({ mensaje:"No tiene permiso para realizar este cambio" });

  }catch(err){

    return res.status(500).send({ mensaje:errorJSON });

  }

}

const editarUsuarioReportado = async (req = request, res = response) => {

  const { id } = req.params;
  var { contadorReportes } = req.body;

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

    return res.status(400).send({ mensaje:mensajeValidacionContadorReportes });

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

      return res.status(200).send({ mensaje:"Usuario reportado exitosamente" });

    }else{

      return res.status(500).send({ mensaje:"Ocurrió un error inesperado" });

    }

  }catch(err){

    console.log(err);
    res.status(500).send(err);

  }
}

const getListaUsuarios = (req = request, res = response) => {

  try{

    Usuario.getListaUsuarios((err, lista) => {

      if(err){

        return res.status(500).send("Ocurrió un error inesperado");

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
  
        return res.status(500).send({ mensaje:"Ocurrió un error inesperado" });
  
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

      return res.status(400).send({ mensaje:"Recurso inexistente" });
  
    }

    if(usuarioEncontrado[0].idRol !== "RF_123_R" || usuarioEncontrado[0].estadoUsuario !== "Aceptado"){

      return res.status(400).send({ mensaje:"Este usuario no tiene acceso a este recurso" });

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

      return res.status(400).send({ mensaje:"Recurso inexistente" });
  
    }

    if(usuarioEncontrado[0].idRol !== "RF_123_R" || usuarioEncontrado[0].estadoUsuario !== "Aceptado"){

      return res.status(400).send({ mensaje:"Este usuario no tiene acceso a este recurso" });

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
    const { id } = req.params;
    Usuario.borrar(id, (err, result)=>{
      (err)?res.send(err):res.send(result);
    });
  }

module.exports = {
  crearCuenta,
  editarCuenta,
  editarUsuarioReportado,
  eliminarCuenta,
  getListaUsuarios,
  buscarUsuario,
  getUsuarioRegistrado,
  consultarListaEnlacesDonacion,
  consultarListaRedesSociales,
  usuauriosDelete
};