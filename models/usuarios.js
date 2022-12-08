const dbConn = require('../config/db.config');
const validadorCorreo = require('deep-email-validator');

let Usuario = (usuario) => {

    this.idUsuario = usuario.idUsuario;
    this.usuario = usuario.usuario;
    this.correoElectronico = usuario.correoElectronico;
    this.biografia = usuario.biografia;
    this.contadorReportes = usuario.contadorReportes;
    this.contrasenia = usuario.contrasenia;
    this.nombre = usuario.nombre;
    this.direccion = usuario.direccion;
    this.fechaNacimiento = usuario.fechaNacimiento;
    this.fotoPerfilUsuario = usuario.fotoPerfilUsuario;
    this.numeroTelefono = usuario.numeroTelefono;
    this.estadoUsuario = usuario.estadoUsuario;
    this.idRol = usuario.idRol;

}

Usuario.validarCamposVacios = (data) => {

    if(!data.correoElectronico || data.correoElectronico === "") return "Correo no ingresado";
    
    if(!data.usuario || data.usuario === "") return "Nombre de usuario no ingresado";

    if(!data.idRol || data.idRol === "") return "Id del rol no ingresado";

    if(!data.fechaNacimiento || data.fechaNacimiento === "") return "Fecha de nacimiento no ingresado";

    if(!data.contrasenia || data.contrasenia === "") return "Contraseña no ingresada";

    if(!data.numeroTelefono || data.numeroTelefono === "") return "Telefono no ingresado";

    if(!data.nombre || data.nombre === "") return "Nombre de la persona no ingresado";

    if(!data.idUsuario || data.idUsuario === "") return "Id del usuario no ingresado";

    return null;

}

Usuario.validarCampoVacioContadorReportes = (contadorReportes) => {

    if(contadorReportes < 0 || contadorReportes === null) return "Contador de reportes no ingresado";

    return null;

}

Usuario.validarCampoVacioEstadoUsuario = (estadoUsuario) => {

    if(!estadoUsuario || estadoUsuario === "") return "Estado de usuario no ingresado";
    
    return null;

}

Usuario.validarTipoDeDato = (data) => {

    if(typeof data.usuario !== "string") return "El tipo de dato del nombre de usuario es incorrecto";
    
    if(typeof data.idUsuario !== "string") return "El tipo de dato del id del usuario es incorrecto";

    if(typeof data.correoElectronico !== "string") return "El tipo de dato del correo es incorrecto";

    if(typeof data.contrasenia !== "string") return "El tipo de dato de la contraseña es incorrecta";

    if(typeof data.nombre !== "string") return "El tipo de dato del nombre de la persona es incorrecto"

    if(typeof data.numeroTelefono !== "string") return "El tipo de dato del numero de telefono es incorrecto";

    if(typeof data.idRol !== "string") return "El tipo de dato del id del rol es incorrecto";

    if(typeof data.biografia !== "string" && data.biografia) return "El tipo de dato de la biografia es incorrecta";

    if(typeof data.direccion !== "string" && data.direccion) return "El tipo de dato de la direccion es incorrecto";

    if(typeof data.fotoPerfilUsuario !== "string" && 
    data.fotoPerfilUsuario) return "El tipo de dato de la foto de perfil es incorrecto";

    if(typeof data.fechaNacimiento !== "string") return "El tipo de dato de la fecha es incorrecta";

    return null;

}

Usuario.validarTipoDeDatoContadorReportes = (contadorReportes) => {

    if(typeof contadorReportes !== "number" && 
    contadorReportes) return "El tipo de dato del contador de reportes es incorrecto";

    return null;

}

Usuario.validarTipoDeDatoEstadoUsuario = (estadoUsuario) => {

    if(typeof estadoUsuario !== "string") return "El tipo de dato del estado del usuario es incorrecto";
    
    return null;

}

Usuario.validarLimites = (data) => {

    if(data.idUsuario.length > 50) return "El id del usuario excede el limite de 50 caracteres";

    if(data.usuario.lenth > 50) return "El nombre del usuario excede el limite de 50 caracteres";

    if(data.biografia){

        if(data.biografia.length > 100) return "La biografia excede el limite de 50 caracteres";

    }

    if(data.idRol.length > 50) return "El id del rol excede el limite de 50 caracteres";

    if(data.correoElectronico.length > 100) return "El correo excede el limite de 100 caracteres";

    if(data.nombre.length > 100) return "El nombre de la persona excede el limite de 100 caracteres";

    if(data.direccion){

        if(data.direccion.length > 100) return "La direccion excede el limite de 100 caracteres";

    }

    if(data.fotoPerfilUsuario){

        if(data.fotoPerfilUsuario.length > 500) return "La foto de perfil excede el limite de 500 caracteres";

    }

    return null;

}

Usuario.validarLimiteContadorReportes = (contadorReportes) => {

    if(contadorReportes){

        if(contadorReportes > 99999) return "El contador de reportes excede el limite de 99999";

    }

    return null;

}

Usuario.validarLimiteEstadoUsuario = (estadoUsuario) => {

    if(estadoUsuario > 10) return "El estado excede el limite de 10 caracteres";
    
    return null;

}

Usuario.validarContrasenia = (contrasenia) => {
    
    const noHayEspaciosBlancos = /^\S*$/;

    if(!noHayEspaciosBlancos.test(contrasenia)) return "La contraseña no debe tener espacios blancos";

    const hayMinusculas = /^(?=.*[a-z]).*$/;

    if(!hayMinusculas.test(contrasenia)) return "La contraseña debe tener minusculas";

    const hayMayusculas = /^(?=.*[A-Z]).*$/;

    if(!hayMayusculas.test(contrasenia)) return "La contraseña debe tener mayusculas";

    const hayNumeros = /^(?=.*[0-9]).*$/;

    if(!hayNumeros.test(contrasenia)) return "La contraseña debe contener numeros";

    const haySimbolos = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;

    if(!haySimbolos.test(contrasenia)) return "La contraseña debe tener caracteres especiales";

    const esLongitudValida = /^.{8,16}$/;

    if(!esLongitudValida.test(contrasenia)) return "La contraseña debe tener entre 8 a 16 caracteres";

    return null;
}

Usuario.validarFecha = (fecha) => {

    const formato = /^\d{4}-\d{2}-\d{2}$/;

    if(formato.test(fecha)){

        const date = new Date(fecha);
        const timestamp = date.getTime();

        if(typeof timestamp !== 'number' || 
            Number.isNaN(timestamp)) return "No es una fecha aceptable";

        return null;

    }else{

        return "La fecha debe tener el formato YYYY-MM-DD";

    }

}

Usuario.validarTelefono = (telefono) => {

    const formato = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if(!formato.test(telefono)) return "El telefono debe tener 10 digitos y " + 
        "el formato: \nXXX XXXX XXXX\nXXX-XXXX-XXXX\nXXXXXXXXXXX";

    return null;

}

Usuario.validarCorreo = (correo) => {

    return validadorCorreo.validate(correo);

}

Usuario.validarTipoUsuario = (estado, idRol) => {

    if(estado === 'Aceptado' && idRol === 'AN_123_R') return null;

    if(estado === 'En espera' && idRol === 'RF_123_R') return null;

    //if(estado === 'Aceptado' && idRol === 'AD_123_R') return null;

    return "No es posible registrar este usuario";

}

Usuario.getUsuarioPorId = (id, callback) => {

    const consulta = "SELECT * FROM Usuario WHERE idUsuario = ?";

    dbConn.query(consulta, id, (err, res) => {
        
        if(err){

            return callback(err, null);

        }else if(res.length > 0){

            return callback(null, res);

        }else if(res[0]){

            return callback(null, res);

        }else{

            return callback(null, null);

        }

    });

}

Usuario.getUsuarioPorCorreo = (correo, callback) => {

    const consulta = "SELECT * FROM Usuario WHERE correoElectronico = ?";

    dbConn.query(consulta, correo, (err, res) => {

        if(err){

            return callback(err, null);

        }else if(res.length > 0){

            return callback(null, res);

        }else if(res[0]){

            return callback(null, res);

        }else{

            return callback(null, null);

        }

    });

}

Usuario.getUsuarioPorNombreDeUsuario = (bandera, nombreUsuario, callback) => {

    var consulta = "SELECT * FROM Usuario WHERE usuario = ? AND idRol != 'AD_123_R' " + 
    "AND estadoUsuario = 'Aceptado'";

    if(bandera === 1){

        consulta = "SELECT usuario FROM Usuario WHERE usuario = ?";

    }else if(bandera === 2){

        consulta = "SELECT * FROM Usuario WHERE usuario = ? AND estadoUsuario = 'Aceptado'";

    }

    dbConn.query(consulta, nombreUsuario, (err, res) => {
        
        if(err){

            return callback(err, null);

        }else if(res.length > 0){

            return callback(null, res);

        }else if(res[0]){

            return callback(null, res);

        }else{

            return callback(null, null);

        }

    });

}

Usuario.crearUsuario = (data, callback) => {

    dbConn.query("INSERT INTO Usuario SET ?", data, (err, res) => {

        (err)
            ?callback(err, null)
            :callback(null, res);

    });

}

Usuario.editarUsuario = (id, usr, callback) => {

    let data = [
        usr.idUsuario,
        usr.usuario,
        usr.correoElectronico,
        usr.biografia,
        usr.contadorReportes,
        usr.contrasenia,
        usr.nombre,
        usr.direccion,
        usr.fechaNacimiento,
        usr.fotoPerfilUsuario,
        usr.numeroTelefono,
        usr.estadoUsuario,
        usr.idRol,
        id
    ];

    let consulta = "UPDATE Usuario SET idUsuario = ?, usuario = ?, correoElectronico = ?, biografia = ?, " + 
    "contadorReportes = ?, contrasenia = ?, nombre = ?, direccion = ?, fechaNacimiento = ?, fotoPerfilUsuario = ?, " + 
    "numeroTelefono = ?, estadoUsuario = ?, idRol = ? WHERE idUsuario = ?";
    
    dbConn.query(consulta, data, (err, res) => {

        (err)
            ?callback(err, null)
            :callback(null, res);

    });

}

Usuario.editarUsuarioReportado = (id, contadorReportes, callback) => {

    dbConn.query("UPDATE Usuario SET contadorReportes = ? WHERE idUsuario = ?", [contadorReportes, id], (err, res) => {

        (err)
            ?callback(err, null)
            :callback(null, res);

    });

}

Usuario.getContadorReportes = (id, callback) => {

    dbConn.query("SELECT contadorReportes FROM Usuario WHERE idUsuario = ?", id, (err, res) => {

        if(err){

            return callback(err, null);

        }else if(res.length > 0){

            return callback(null, res);

        }else if(res[0]){

            return callback(null, res);

        }else{

            return callback(null, null);

        }

    });

}

Usuario.editarAccesoDeUsuario = (id, estado, callback) => {
    
    dbConn.query("UPDATE Usuario SET estadoUsuario = ? WHERE idUsuario = ?", [estado, id], (err, res) => {

        (err)
            ?callback(err, null)
            :callback(null, res);

    });

}

Usuario.borrar = (id, callback) => {
    dbConn.query("DELETE FROM Usuario WHERE idUsuario = ?", id, (err, res) => {
        (err)?callback(err, null):callback(null, res);
    });
}

Usuario.getListaUsuarios = (bandera, callback) => {

    var consulta = "SELECT * FROM Usuario WHERE idRol != 'AD_123_R' AND estadoUsuario = 'Aceptado'";

    if(bandera === 1) consulta = "SELECT * FROM Usuario WHERE idRol = 'RF_123_R' AND estadoUsuario = 'En espera'";
    
    if( bandera === 2) consulta = "SELECT * FROM Usuario WHERE idRol != 'AD_123_R' AND estadoUsuario = 'Aceptado' " + 
        "AND contadorReportes > 0";

    dbConn.query(consulta, (err, res) => {

        if(err){

            return callback(err, null);

        }else if(res.length > 0){

            return callback(null, res);

        }else if(res[0]){

            return callback(null, res);

        }else{

            return callback(null, null);

        }

    });

}

Usuario.getListaEnlacesDonacion = (id, callback) => {

    const consulta = "SELECT e.idEnlaceDonacion, e.enlace, e.idMetodoDonacion, m.metodo " + 
    "FROM EnlaceDonacion e LEFT JOIN MetodoDonacion m ON e.idMetodoDonacion = m.idMetoDonacion " + 
    "WHERE e.idRefugio = ?";

    dbConn.query(consulta, id, (err, res) => {

        if(err){

            return callback(err, null);

        }else if(res.length > 0){

            return callback(null, res);

        }else if(res[0]){

            return callback(null, res);

        }else{

            return callback(null, null);

        }

    });

}

Usuario.getListaRedesSociales = (id, callback) => {

    const consulta = "SELECT e.idEnlaceRedSocial, e.enlace, e.idTipoRedSocial, t.nombre " + 
    "FROM EnlaceRedSocial e LEFT JOIN TipoRedSocial t ON e.idTipoRedSocial = t.idTipoRedSocial " + 
    "WHERE e.idUsuario = ?";

    dbConn.query(consulta, id, (err, res) => {

        if(err){

            return callback(err, null);

        }else if(res.length > 0){

            return callback(null, res);

        }else if(res[0]){

            return callback(null, res);

        }else{

            return callback(null, null);

        }

    });

}

module.exports = Usuario;