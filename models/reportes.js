const { request } = require('express');
const dbConn = require('../config/db.config');

let Reporte = (reporte) => {
    this.idReporteDeMaltrato = reporte.idReporteDeMaltrato;
    this.ubicacion = reporte.ubicacion;
    this.descripcion = reporte.descripcion;
    this.fecha = reporte.fecha;
    this.idRefugio = reporte.idRefugio;
    this.idUsuario = reporte.idUsuario;
    this.nombreUsuario = reporte.nombreUsuario;
};

Reporte.getReportById = (id, callback) => {
    let sqlQuery = "SELECT r.idReporteDeMaltrato, r.ubicacion, r.descripcion, r.fecha, r.idRefugio, r.idUsuario, u.nombreUsuario FROM ReporteDeMaltrato r inner join Usuario u on r.idUsuario = u.idUsuario where r.idReporteDeMaltrato = ?";
    dbConn.query(sqlQuery, id, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Reporte.getLastReports = (num, callback) => {
    let sqlQuery = "SELECT r.idReporteDeMaltrato, r.ubicacion, r.descripcion, r.fecha, r.idRefugio, r.idUsuario, u.nombreUsuario FROM ReporteDeMaltrato r inner join Usuario u on r.idUsuario = u.idUsuario order by r.fecha desc limit " + num;
    dbConn.query(sqlQuery, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Reporte.update = (clave, rep, callback) => {
    data = [
        rep.ubicacion,
        rep.descripcion,
        rep.fecha,
        rep.idRefugio,
        clave
    ];
    let sqlQuery = "UPDATE ReporteDeMaltrato SET ubicacion = ?, descripcion = ?, fecha = ?, idRefugio = ? WHERE idReporteDeMaltrato = ?";
    dbConn.query(sqlQuery, data, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)

    });
};

Reporte.deleteById = (idR, callback) => {
    let sqlQuery = "delete from ReporteDeMaltrato where idReporteDeMaltrato = ?";
    dbConn.query(sqlQuery, idR, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res);
    });
}

Reporte.create = (data, callback) => {
    let sqlQuery = "INSERT INTO ReporteDeMaltrato SET ?";
    dbConn.query(sqlQuery, data, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

module.exports = Reporte;