const dbConn = require('../config/db.config');

let EnlaceRedSocial = (enlaceRedSocial) => {

    this.idEnlaceRedSocial = enlaceRedSocial.idEnlaceRedSocial;
    this.enlace = enlaceRedSocial.enlace;
    this.idTipoRedSocial = enlaceRedSocial.idTipoRedSocial;
    this.idUsuario = enlaceRedSocial.idUsuario;

}

EnlaceRedSocial.getListaRedesSociales = (id, callback) => {

    const consulta = "SELECT e.idEnlaceRedSocial, e.enlace, e.idTipoRedSocial, t.nombre " + 
    "FROM EnlaceRedSocial e LEFT JOIN TipoRedSocial t ON e.idTipoRedSocial = t.idTipoRedSocial WHERE e.idUsuario = ?";

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

module.exports = EnlaceRedSocial;