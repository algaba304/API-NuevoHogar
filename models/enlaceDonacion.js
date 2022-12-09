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

module.exports = EnlaceDonacion;