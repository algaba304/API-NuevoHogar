const dbConn = require('../config/db.config');

let Evidencia = (evidencia) => {
    this.idEvidencia =  evidencia.idEvidencia;
    this.titulo = evidencia.titulo;
    this.enlace = evidencia.enlace;
    this.idReporteDeMaltrato = evidencia.idReporteDeMaltrato;
};

Evidencia.getAll = (idRM, callback) => {
    dbConn.query("Select * from Evidencia where idReporteDeMaltrato = ?", idRM,
    (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Evidencia.deleteOneEvidence = (idE, callback) => {
    let sqlQuery = "Delete from Evidencia where idEvidencia = ?";
    dbConn.query(sqlQuery, idE, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res);
    });
};

Evidencia.deleteAllEvidences = (idRM, callback) => {
    let sqlQuery = "Delete from Evidencia where idReporteDeMaltrato = ?";
    dbConn.query(sqlQuery, idRM, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res);
    });
};

Evidencia.create = (data, callback) => {
    let sqlQuery = "Insert into Evidencia set ?";
    dbConn.query(sqlQuery, data, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

module.exports = Evidencia;