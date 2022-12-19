const dbConn = require('../config/db.config');

let Rol = (rol) => {

    this.idRol = rol.idRol;
    this.nombre = rol.nombre;

}

Rol.getListaRoles = (callback) => {

    dbConn.query("SELECT * FROM Rol WHERE idRol != 'AD_123_R'", (err, res) => {

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

Rol.getRol = (id, callback) => {

    dbConn.query("SELECT * FROM Rol WHERE idRol = ?", id, (err, res) => {

        if(err){

            return callback(err, null);

        }else if(res.length > 0){

            return callback(null, res[0]);

        }else if(res[0]){

            return callback(null, res[0]);

        }else{

            return callback(null, null);

        }

    });

}

module.exports = Rol;