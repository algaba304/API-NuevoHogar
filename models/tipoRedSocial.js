const dbConn = require('../config/db.config');

let TipoRedSocial = (tipoRedSocial) => {

    this.idTipoRedSocial = tipoRedSocial.idTipoRedSocial;
    this.nombre = tipoRedSocial.nombre;

}

TipoRedSocial.getRedes = (callback) => {

    dbConn.query("SELECT * FROM TipoRedSocial", (err, res) => {

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

module.exports = TipoRedSocial;