const { 

  response, 
  request 

} = require('express');
const Usuario = require('../models/usuarios');
const Rol = require('../models/roles');
const { editarAccesoGenerico } = require('../controllers/autorizacion');
const { 
  
  getUsuarioPorId,
  getUsuarioPorNombreDeUsuario

 } = require('../controllers/busquedas');
const { 

  quitarEspaciosBlancos,
  quitarEspaciosBlancosEdicion,
  validarEdicionUsuarioDTO,
  validarRegistroUsuarioDTO, 
  buscarInformacionRepetida,
  buscarCorreoYNombreUsuarioRepetido

} = require('../controllers/validaciones');
const moment = require('moment/moment');
const error404 = "Recurso inexistente";
const error500 = "Ocurrión un error inesperado";

const crearCuenta = async (req = request, res = response) => {
  
  try{

    let data = req.body;
    data.rol = `${data.rol.idRol}`;
    data.contadorReportes = 0;

    let dataDB = {

      "idUsuario" : data.idUsuario,
      "idRol" : data.rol,
      "estadoUsuario" : data.estadoUsuario,
      "nombreUsuario" : data.nombreUsuario,
      "correoElectronico" : data.correoElectronico,
      "contrasenia" : data.contrasenia,
      "nombre" : data.nombre,
      "direccion" : data.direccion,
      "fechaNacimiento" : data.fechaNacimiento,
      "numeroTelefono" : data.numeroTelefono,
      "contadorReportes" : data.contadorReportes

    }

    dataDB = quitarEspaciosBlancos(dataDB);

    const mensajeValidacion = await validarRegistroUsuarioDTO(dataDB);

    if(mensajeValidacion !== null) return res.status(409).send({ 
      
      mensaje : mensajeValidacion 
    
    });

    const mensajeInformacionRepetida = await buscarInformacionRepetida(res, dataDB);

    if(mensajeInformacionRepetida) return res.status(409).send({ 
      
      mensaje : mensajeInformacionRepetida 
    
    });
    
    const resultadoRegistro = await new Promise((resolve, reject) => {
      
      Usuario.crearUsuario(dataDB, (err, result) => {
        
        if(err) return res.status(500).send({ 
          
          mensaje : error500
        
        });
        
        resolve(result);

      });

    });
    
    if(resultadoRegistro.affectedRows === 1){
      
      return res.status(200).send({
        
        mensaje : "Se agregó el usuario exitosamente"
      
      });

    }else{
      
      return res.status(500).send({
        
        mensaje : error500
      
      });

    }

  }catch(err){
    
    return res.status(500).send({ 

      mensaje : error500
      
    });

  }

}

const editarCuenta = async (req = request, res = response) => {

  try{

    let data = req.body;
    const { id } = req.params;
    let dataDB = {

      "nombreUsuario" : data.nombreUsuario,
      "correoElectronico" : data.correoElectronico,
      "biografia" : data.biografia,
      "contrasenia" : data.contrasenia,
      "nombre" : data.nombre,
      "direccion" : data.direccion,
      "fechaNacimiento" : data.fechaNacimiento,
      "numeroTelefono" : data.numeroTelefono,
      "fotoPerfilUsuario" : data.fotoPerfilUsuario

    }

    dataDB = await quitarEspaciosBlancosEdicion(dataDB);
    var usuarioEncontrado = await getUsuarioPorId(res, id);
    
    if(usuarioEncontrado !== null) {
          
      if(usuarioEncontrado.idRol === "AD_123_R") return res.status(404).send({ 
        
        mensaje : error404 
      
      });
  
    }else{
  
      return res.status(404).send({ 
        
        mensaje : error404 
      
      });
  
    }
  
    const mensajeValidacion = await validarEdicionUsuarioDTO(dataDB);
    
    if(mensajeValidacion !== null) return res.status(400).send({ 
      
      mensaje : mensajeValidacion 
    
    });
    
    const mensajeInformacionRepetida = await buscarCorreoYNombreUsuarioRepetido(res, dataDB);

    if(mensajeInformacionRepetida !== null) return res.status(409).send({
      
      mensaje : mensajeInformacionRepetida

    });

    const resultadoRegistro = await new Promise((resolve, reject) => {
    
      Usuario.editarUsuario(id, dataDB, (err, result) => {
        
        if(err) return res.status(500).send({ 
          
          mensaje : error500 
        
        });

        resolve(result);
  
      });
  
    });

    if(resultadoRegistro.affectedRows === 1){

      return res.status(200).send({ 
        
        mensaje : "Se editó el usuario exitosamente" 
      
      });
  
    }else{
      
      return res.status(500).send({ 
        
        mensaje : error500
      
      });
  
    }
  
  }catch(err){
    
    return res.status(500).send({ 
      
      mensaje : error500 
    
    });

  }

}
  
const eliminarCuenta = async (req = request, res = response) => {
  
  try{

    const { id } = req.params;
    var { estadoUsuario } = req.body;
    estadoUsuario = estadoUsuario.trim();
    const usuarioEncontrado = await getUsuarioPorId(res, id);

    if(usuarioEncontrado !== null) {
      
      if(usuarioEncontrado.idRol === "AD_123_R") return res.status(404).send({ 
        
        mensaje : error404 
      
      });

      if(usuarioEncontrado.estadoUsuario !== "Aceptado") return res.status(404).send({ 
        
        mensaje : error404 
      
      });

    }else{

      return res.status(404).send({ 
        
        mensaje : error404 
      
      });

    }

    const mensajeValidacion = await validarEntradaEstadoUsuario(estadoUsuario);

    if(mensajeValidacion !== null) return res.status(400).send({ 
      
      mensaje : mensajeValidacion 
    
    });

    if(estadoUsuario === "Eliminado"){

      return await editarAccesoGenerico(res, id, estadoUsuario);

    }

    return res.status(400).send({ 
      
      mensaje : "No puede realizar este cambio" 
    
    });

  }catch(err){

    return res.status(500).send({ 
      
      mensaje : error500 
    
    });

  }

}

const reportarUsuario = async (req = request, res = response) => {

  try{

    const { id } = req.params;
    var { contadorReportes } = req.body;

    const mensajeValidacion = await validarEntradaContadorReportes(contadorReportes);

    if(mensajeValidacion !== null){

      return res.status(400).send({ 
        
        mensaje : mensajeValidacion 
      
      });

    }

    const contadorAnterior = await new Promise((resolve, reject) => {
      
      Usuario.getContadorReportes(id, (err, contador) => {

        (err) ? reject(err) : resolve(contador);

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

        (err) ? reject(err) : resolve(result);
    
      });

    });

    if(resultadoRegistro.affectedRows === 1){

      return res.status(200).send({ 
        
        mensaje : "Usuario reportado exitosamente" 
      
      });

    }else{

      return res.status(500).send({ 
        
        mensaje : error500 
      
      });

    }

  }catch(err){

    res.status(500).send({
      
      mensaje : error500

    });

  }
}

const getListaUsuarios = (req = request, res = response) => {

  try{

    const bandera = 0;

    Usuario.getListaUsuarios(bandera, (err, lista) => {

      if(err){

        return res.status(500).send({
          
          mensaje : error500

        });

      }else if(lista !== null){

        return res.status(200).send(lista);

      }else{

        return res.status(204).send();

      }
  
    });

  }catch(err){

    return res.status(500).send({
      
      mensaje : error500

    });

  }
  
}

const iniciarSesion = async (req = request, res = response) => {

  try{
    
    const { nombreUsuario } = req.query;
    const { contrasenia } = req.query;
    const usuarioEncontrado = await getUsuarioPorNombreDeUsuario(res, nombreUsuario);
    
    if(usuarioEncontrado.contrasenia !== contrasenia) return res.status(400).send({
      mensaje : "Contraseña incorrecta"
    });
    
    if(usuarioEncontrado !== null){
      
      const rolObtenido = await new Promise((resolve, reject) => {

        Rol.getRol(usuarioEncontrado.idRol, (err, rol) => {
    
          if(err){

            return res.status(500).send({
    
              mensaje : error500
      
            });

          }

          resolve(rol);
    
        });
  
      });

      const fecha = moment(usuarioEncontrado.fechaNacimiento).utc().format("YYYY-MM-DD");
      fechaString = fecha.toString();
      
      let usuario = {

        "idUsuario" : usuarioEncontrado.idUsuario,
        "correoElectronico" : usuarioEncontrado.correoElectronico,
        "nombre" : usuarioEncontrado.nombre,
        "numeroTelefono" : usuarioEncontrado.numeroTelefono,
        "direccion" : usuarioEncontrado.direccion,
        "contrasenia" : usuarioEncontrado.contrasenia,
        "fechaNacimiento" : fechaString,
        "biografia" : usuarioEncontrado.biografia,
        "fotoPerfilUsuario" : usuarioEncontrado.fotoPerfilUsuario,
        "rol" : { 
          "idRol" : usuarioEncontrado.idRol, 
          "nombre" : rolObtenido.nombre 
        },
        "nombreUsuario" : usuarioEncontrado.nombreUsuario,
        "contadorReportes" : usuarioEncontrado.contadorReportes,
        "estadoUsuario" : usuarioEncontrado.estadoUsuario
  
      }

      return res.status(200).send(usuario);

    }

    return res.status(204).send();

  }catch(err){
    
    return res.status(500).send({

      mensaje : error500

    });

  }

}

module.exports = {

  crearCuenta,
  editarCuenta,
  reportarUsuario,
  eliminarCuenta,
  getListaUsuarios,
  iniciarSesion

};