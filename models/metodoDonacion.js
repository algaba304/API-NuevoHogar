const dbConn = require('../config/db.config');

let MetodoDonacion = (metodoDonacion) => {

    this.idMetodoDonacion = metodoDonacion.idMetodoDonacion;
    this.metodo = metodoDonacion.metodo;

}

MetodoDonacion.getMetodos = (callback) => {

    dbConn.query("SELECT * FROM MetodoDonacion", (err, res) => {

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

module.exports = MetodoDonacion;