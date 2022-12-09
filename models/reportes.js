const dbConn = require('../config/db.config');

let Reporte = (reporte) => {
    this.idReporteDeMaltrato = reporte.idReporteDeMaltrato;
    this.ubicacion = reporte.ubicacion;
    this.descripcion = reporte.descripcion;
    this.fecha = reporte.fecha;
    this.idRefugio = reporte.idRefugio;
    this.idUsuario = reporte.idUsuario;
};

