const { 

  response, 
  request 

} = require('express');
const Usuario = require('../models/usuarios');
const { editarAccesoGenerico } = require('../controllers/autorizacion');
const { 
  
  getUsuarioPorId,
  getUsuarioPorNombreDeUsuario

 } = require('../controllers/busquedas');
const { 

  quitarEspaciosBlancos,
  validarEntradaEstadoUsuario,
  validarEntradaContadorReportes,
  validarEntradasUsuarioDTO, 
  buscarInformacionRepetida,
  buscarCorreoYNombreUsuarioRepetido

} = require('../controllers/validaciones');
const error404 = "Recurso inexistente";
const error500 = "Ocurrión un error inesperado";

const crearCuenta = async (req = request, res = response) => {
  
  try{

    let data = req.body;
    data.idRol = `${ req.body.idRol.idRol }`;
    data.contadorReportes = 0;
    data = quitarEspaciosBlancos(data);

    const mensajeValidacion = await validarEntradasUsuarioDTO(data);

    if(mensajeValidacion !== null) return res.status(409).send({ 
      
      mensaje : mensajeValidacion 
    
    });

    const mensajeInformacionRepetida = await buscarInformacionRepetida(res, data);

    if(mensajeInformacionRepetida) return res.status(409).send({ 
      
      mensaje : mensajeInformacionRepetida 
    
    });

    const resultadoRegistro = await new Promise((resolve, reject) => {
        
      Usuario.crearUsuario(data, (err, result) => {

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
    const {id} = req.params;
    data.idRol = `${ req.body.idRol.idRol }`;
    data.contadorReportes = 0;
    data.idUsuario = id;
    data = await quitarEspaciosBlancos(data);
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
  
    const mensajeValidacion = await validarEntradasUsuarioDTO(data);
    
    if(mensajeValidacion !== null) return res.status(400).send({ 
      
      mensaje : mensajeValidacion 
    
    });
    
    usuarioEncontrado = await buscarCorreoYNombreUsuarioRepetido(res, data);

    const resultadoRegistro = await new Promise((resolve, reject) => {
    
      Usuario.editarUsuario(id, data, (err, result) => {
  
        if(err) return resultadoRegistro.status(500).send({ 
          
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

    const { usuario } = req.query;
    const usuarioEncontrado = await getUsuarioPorNombreDeUsuario(res, usuario);

    if(usuarioEncontrado !== null) return res.status(200).send(usuarioEncontrado);

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