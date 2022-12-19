const dbConn = require('../config/db.config');

let EnlaceDonacion = (enlaceDonacion) => {

    this.idEnlaceDonacion = enlaceDonacion.idEnlaceDonacion;
    this.enlace = enlaceDonacion.enlace;
    this.idMetodoDonacion = enlaceDonacion.idMetodoDonacion;
    this.idUsuario = enlaceDonacion.idUsuario;

}

EnlaceDonacion.getListaEnlacesDonacion = (id, callback) => {

    const consulta = "SELECT e.idEnlaceDonacion, e.enlace, e.idMetodoDonacion, m.metodo " + 
    "FROM EnlaceDonacion e LEFT JOIN MetodoDonacion m ON e.idMetodoDonacion = m.idMetodoDonacion " + 
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

EnlaceDonacion.crearEnlaceDonacion = (enlace, callback) => {

    const consulta = "INSERT INTO EnlaceDonacion SET ?";

    dbConn.query(consulta, enlace, (err, res) => {

        (err) ? callback(err, null) : callback(null, res);

    });

}

EnlaceDonacion.editarEnlaceDonacion = (id, enlace, callback) => {

    const consulta = "UPDATE EnlaceDonacion SET enlace = ?, idMetodoDonacion = ?, idUsuario = ? " +
    "WHERE idEnlaceDonacion = ?";

    let data = [
        enlace.enlace,
        enlace.idMetodoDonacion,
        id,
        enlace.idEnlaceDonacion
    ]

    dbConn.query(consulta, data, (err, res) => {

        (err) ? callback(err, null) : callback(null, res);

    });

}

EnlaceDonacion.buscarEnlace = (idEnlaceDonacion, callback) => {

    dbConn.query("SELECT * FROM EnlaceDonacion WHERE idEnlaceDonacion = ?", idEnlaceDonacion, (err, res) => {

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

module.exports = EnlaceDonacion;