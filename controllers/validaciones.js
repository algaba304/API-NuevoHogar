const Usuario = require('../models/usuarios');
const { 
    
    getUsuarioPorId, 
    getUsuarioPorCorreo,
    getUsuarioPorNombreDeUsuario

} = require('../controllers/busquedas');

const quitarEspaciosBlancos = (data) => {

    data.idUsuario = data.idUsuario.trim();
    data.idRol = data.idRol.trim();
    data.estadoUsuario = data.estadoUsuario.trim();
    data = quitarEspaciosBlancosEdicion(data);

    return data;

}

const quitarEspaciosBlancosEdicion = (data) => {

    data.correoElectronico = data.correoElectronico.trim();
    data.nombreUsuario = data.nombreUsuario.trim();
    data.fechaNacimiento = data.fechaNacimiento.trim();
    data.contrasenia = data.contrasenia.trim();
    data.numeroTelefono = data.numeroTelefono.trim();
    data.nombre = data.nombre.trim();

    if(data.biografia) data.biografia = data.biografia.trim();

    if(data.direccion) data.direccion = data.direccion.trim();

    if(data.fotoPerfilUsuario) data.fotoPerfilUsuario = data.fotoPerfilUsuario.trim();

    return data;

}

const validarRegistroUsuarioDTO = async (data) => {

    return await new Promise((resolve, reject) => {

        var mensaje = Usuario.validarCamposVacios(data);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarEntradaIdUsuario(data.idUsuario);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarEntradaEstadoUsuario(data.estadoUsuario);

        if(mensaje !== null) return resolve(mensaje);
        
        mensaje = Usuario.validarEntradaContadorReportes(data.contadorReportes);

        if(mensaje !== null) return resolve(mensaje);

        mensaje = Usuario.validarEntradaIdRol(data.idRol);

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

        mensaje = Usuario.validarCorreo(data.correoElectronico);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarTipoUsuario(data.estadoUsuario, data.idRol);

        if(mensaje !== null) return resolve(mensaje);

        return resolve(null);

    });

}

const validarEdicionUsuarioDTO = async (data) => {

    return await new Promise((resolve, reject) => {
        
        var mensaje = Usuario.validarCamposVacios(data);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarTipoDeDato(data);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarLimites(data);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarCorreo(data.correoElectronico);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarFecha(data.fechaNacimiento);

        if(mensaje) return resolve(mensaje);

        mensaje = Usuario.validarTelefono(data.numeroTelefono);

        if(mensaje) return resolve(mensaje);

        return resolve(null);

    });

}

const buscarInformacionRepetida = async (res, data) => {

    var usuarioEncontrado = await getUsuarioPorId(res, data.idUsuario);

    if(usuarioEncontrado !== null){

        if(usuarioEncontrado.idUsuario) return "Usuario ya registrado";

    }

    usuarioEncontrado = await getUsuarioPorCorreo(res, data.correoElectronico);

    if(usuarioEncontrado !== null){

        if(usuarioEncontrado.correoElectronico) return "El correo ya está registrado";

    }

    usuarioEncontrado = await getUsuarioPorNombreDeUsuario(res, data.nombreUsuario);

    if(usuarioEncontrado !== null){

        if(usuarioEncontrado.nombreUsuario) return "El nombre de usuario ya está registrado";

    }

    return null;

}

const buscarCorreoYNombreUsuarioRepetido = async (res, data) => {

    usuarioEncontrado = await getUsuarioPorCorreo(res, data.correoElectronico);
    
    if(usuarioEncontrado !== null){

        if(usuarioEncontrado.nombreUsuario !== data.nombreUsuario) return "El correo ya esta registrado";

    }

    return null;

}

module.exports = {

    quitarEspaciosBlancos,
    quitarEspaciosBlancosEdicion,
    validarEdicionUsuarioDTO,
    validarRegistroUsuarioDTO,
    buscarInformacionRepetida,
    buscarCorreoYNombreUsuarioRepetido
    
};