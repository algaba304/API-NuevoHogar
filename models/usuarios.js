const dbConn = require('../config/db.config');

let Usuario = (usuario) => {

    this.idUsuario = usuario.idUsuario;
    this.nombreUsuario = usuario.nombreUsuario;
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
    
    if(!data.nombreUsuario || data.nombreUsuario === "") return "Nombre de usuario no ingresado";

    if(!data.fechaNacimiento || data.fechaNacimiento === "") return "Fecha de nacimiento no ingresado";

    if(!data.contrasenia || data.contrasenia === "") return "Contraseña no ingresada";

    if(!data.numeroTelefono || data.numeroTelefono === "") return "Telefono no ingresado";

    if(!data.nombre || data.nombre === "") return "Nombre de la persona no ingresado";

    return null;

}

Usuario.validarEntradaIdUsuario = (idUsuario) => {

    if(!idUsuario || idUsuario === "") return "Id del usuario no ingresado";

    if(typeof idUsuario !== "string") return "El tipo de dato del id del usuario es incorrecto";

    if(idUsuario.length > 50) return "El id del usuario excede el limite de 50 caracteres";

    return null;

}

Usuario.validarEntradaContadorReportes = (contadorReportes) => {

    if(contadorReportes < 0 || contadorReportes === null) return "Contador de reportes no ingresado";

    if(contadorReportes){

        if(contadorReportes > 9999) return "El contador de reportes excede el limite de 99999";

    }

    if(typeof contadorReportes !== "number" && 
    contadorReportes) return "El tipo de dato del contador de reportes es incorrecto";

    return null;

}

Usuario.validarEntradaEstadoUsuario = (estadoUsuario) => {

    if(!estadoUsuario || estadoUsuario === "") return "Estado de usuario no ingresado";

    if(typeof estadoUsuario !== "string") return "El tipo de dato del estado del usuario es incorrecto";

    if(estadoUsuario > 10) return "El estado excede el limite de 10 caracteres";
    
    return null;

}

Usuario.validarEntradaIdRol = (idRol) => {

    if(!idRol || idRol === "") return "Id del rol no ingresado";

    if(typeof idRol !== "string") return "El tipo de dato del id del rol es incorrecto";

    if(idRol.length > 50) return "El id del rol excede el limite de 50 caracteres";

    return null;

}

Usuario.validarTipoDeDato = (data) => {

    if(typeof data.nombreUsuario !== "string") return "El tipo de dato del nombre de usuario es incorrecto";

    if(typeof data.correoElectronico !== "string") return "El tipo de dato del correo es incorrecto";

    if(typeof data.contrasenia !== "string") return "El tipo de dato de la contraseña es incorrecta";

    if(typeof data.nombre !== "string") return "El tipo de dato del nombre de la persona es incorrecto"

    if(typeof data.numeroTelefono !== "string") return "El tipo de dato del numero de telefono es incorrecto";

    if(typeof data.biografia !== "string" && data.biografia) return "El tipo de dato de la biografia es incorrecta";

    if(typeof data.direccion !== "string" && data.direccion) return "El tipo de dato de la direccion es incorrecto";

    if(typeof data.fotoPerfilUsuario !== "string" && 
    data.fotoPerfilUsuario) return "El tipo de dato de la foto de perfil es incorrecto";

    if(typeof data.fechaNacimiento !== "string") return "El tipo de dato de la fecha es incorrecta";

    return null;

}

Usuario.validarLimites = (data) => {

    if(data.nombreUsuario.lenth > 50) return "El nombre del usuario excede el limite de 50 caracteres";

    if(data.biografia){

        if(data.biografia.length > 100) return "La biografia excede el limite de 50 caracteres";

    }

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

        if(typeof timestamp !== 'number' || Number.isNaN(timestamp)) return "No es una fecha aceptable";

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

    const formato = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!formato.test(correo)) return "El correo ingresado no es válido";

    return null;

}

Usuario.validarTipoUsuario = (estado, idRol) => {

    if(estado === 'Aceptado' && idRol === 'AN_123_R') return null;

    if(estado === 'En espera' && idRol === 'RF_123_R') return null;

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

    var consulta = "SELECT * FROM Usuario WHERE nombreUsuario = ? AND idRol != 'AD_123_R' AND estadoUsuario = 'Aceptado'";

    if(bandera === 1){

        consulta = "SELECT nombreUsuario FROM Usuario WHERE usuario = ?";

    }else if(bandera === 2){

        consulta = "SELECT * FROM Usuario WHERE nombreUsuario = ? AND estadoUsuario = 'Aceptado'";

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
        
        (err) ? callback(err, null) : callback(null, res);

    });

}

Usuario.editarUsuario = (id, usr, callback) => {

    let data = [
        usr.nombreUsuario,
        usr.correoElectronico,
        usr.biografia,
        usr.contrasenia,
        usr.nombre,
        usr.direccion,
        usr.fechaNacimiento,
        usr.numeroTelefono,
        usr.fotoPerfilUsuario,
        id
    ];

    let consulta = "UPDATE Usuario SET nombreUsuario = ?, correoElectronico = ?, biografia = ?, contrasenia = ?, " + 
    "nombre = ?, direccion = ?, fechaNacimiento = ?, numeroTelefono = ?, fotoPerfilUsuario = ? " + 
    "WHERE idUsuario = ?";
    
    dbConn.query(consulta, data, (err, res) => {

        (err) ? callback(err, null) : callback(null, res);

    });

}

Usuario.editarUsuarioReportado = (id, contadorReportes, callback) => {

    dbConn.query("UPDATE Usuario SET contadorReportes = ? WHERE idUsuario = ?", [contadorReportes, id], (err, res) => {

        (err) ? callback(err, null) : callback(null, res);

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

        (err) ? callback(err, null) : callback(null, res);

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

Usuario.guardarRutaImagen = (id, rutaImagen, callback) => {

    dbConn.query("UPDATE Usuario SET fotoPerfilUsuario = ? WHERE idUsuario = ?", [rutaImagen, id], (err, res) => {

        (err) ? callback(err, null) : callback(null, res);

    });

}

module.exports = Usuario;