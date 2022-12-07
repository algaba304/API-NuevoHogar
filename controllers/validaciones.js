const Usuario = require('../models/usuarios');

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

module.exports = {
    validarEntradaEstadoUsuario
}