const Usuario = require('../models/usuarios');
const { 
    
    getUsuarioPorId, 
    getUsuarioPorCorreo,
    getUsuarioPorNombreDeUsuario

} = require('../controllers/busquedas');

const quitarEspaciosBlancos = (data) => {

    data.idUsuario = data.idUsuario.trim();
    data.idRol = data.idRol.trim();
    data.correoElectronico = data.correoElectronico.trim();
    data.usuario = data.usuario.trim();
    data.fechaNacimiento = data.fechaNacimiento.trim();
    data.contrasenia = data.contrasenia.trim();
    data.numeroTelefono = data.numeroTelefono.trim();
    data.nombre = data.nombre.trim();
    data.estadoUsuario = data.estadoUsuario.trim();

    if(data.biografia) data.biografia = data.biografia.trim();

    if(data.direccion) data.direccion = data.direccion.trim();

    if(data.fotoPerfilUsuario) data.fotoPerfilUsuario = data.fotoPerfilUsuario.trim();

    return data;

}

const validarEntradasUsuarioDTO = async (data) => {

    return await new Promise((resolve, reject) => {

        var mensaje = Usuario.validarCamposVacios(data);

        if(mensaje) return resolve(mensaje);

        mensaje = validarEntradaEstadoUsuario(data.estadoUsuario);

        if(mensaje !== null) return resolve(mensaje);
        
        mensaje = validarEntradaContadorReportes(data.contadorReportes);

        if(mensaje !== null) return resolve(mensaje);

        mensaje = Usuario.validarTipoDeDato(data);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarLimites(data);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarContrasenia(data.contrasenia);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarFecha(data.fechaNacimiento);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarTelefono(data.numeroTelefono);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarTipoUsuario(data.estadoUsuario, data.idRol);

        if(mensaje) return resolve(mensaje);

        mensaje = validarEntradaCorreo(data.correoElectronico);

        if(mensaje !== null) return resolve(mensaje);

        return resolve(null);

    });

}

const validarEntradaEstadoUsuario = async (estadoUsuario) => {

    return await new Promise((resolve, reject) => {
        
        var mensaje = Usuario.validarCampoVacioEstadoUsuario(estadoUsuario);
        
        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarTipoDeDatoEstadoUsuario(estadoUsuario);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarLimiteEstadoUsuario(estadoUsuario);

        if(mensaje) return resolve(mensaje);

        return resolve(null);

    });

}

const validarEntradaContadorReportes = async (contadorReportes) => {

    return await new Promise((resolve, reject) => {
        
        var mensaje = Usuario.validarCampoVacioContadorReportes(contadorReportes);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarTipoDeDatoContadorReportes(contadorReportes);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarLimiteContadorReportes(contadorReportes);

        if(mensaje) return resolve(mensaje);

        resolve(null);

    });

}

const validarEntradaCorreo = async (correo) => {

    return await new Promise((resolve, reject) => {
        
        resolve(Usuario.validarCorreo(correo));
    
    });

}

const buscarInformacionRepetida = async (res, data) => {

    var usuarioEncontrado = await getUsuarioPorId(res, data.idUsuario);

    if(usuarioEncontrado !== null){

        if(usuarioEncontrado.idUsuario) return "Usuario ya registrado";

    }

    return usuarioEncontrado = await buscarCorreoYNombreUsuarioRepetido(res, data);

}

const buscarCorreoYNombreUsuarioRepetido = async (res, data) => {

    var usuarioEncontrado = await getUsuarioPorCorreo(res, data.correoElectronico);

    if(usuarioEncontrado !== null){

        if(usuarioEncontrado.correoElectronico) return "El correo ya está registrado";

    }

    usuarioEncontrado = await getUsuarioPorNombreDeUsuario(res, data.usuario);

    if(usuarioEncontrado !== null){

        if(usuarioEncontrado.usuario) return "El nombre de usuario ya está registrado";

    }
    
    return null;

}

module.exports = {

    quitarEspaciosBlancos,
    validarEntradaEstadoUsuario,
    validarEntradaContadorReportes,
    validarEntradasUsuarioDTO,
    buscarInformacionRepetida,
    buscarCorreoYNombreUsuarioRepetido
    
};