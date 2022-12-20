const {response, request} = require('express');
const Reporte = require('../models/reportes');

const reportesGetLastReports = (req, res = response) => {
    const {num} = req.params;
    Reporte.getLastReports(num, (err, reportes)=>{
        (err)
            ?res.send(err)
            :res.json(reportes)
    });
}

const reportesGetReport = (req, res = response) => {
    const {idR} = req.params;
    Reporte.getReportById(idR, (err, reportes)=>{
        (err)
            ?res.send(err)
            :res.json(reportes)
    });
}

const reportesPost = (req, res) => {
    let data = req.body;
    console.log(data);
    Reporte.create(data, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}

const reportesDelete = (req, res = response) => {
    const {idR} = req.params;

    Reporte.deleteById(idR, (err, result) =>{
        (err)
            ?res.send(err)
            :res.json(result);
    });
}

const reportesPut = (req, res = response) => {
    const {id} = req.params;
    let data = req.body;
    console.log(data);
    Reporte.update(id, data, (err, result)=>{
        (err)
            ?res.send(err)
            :res.send(result);
    });
}
  
module.exports = {
    reportesGetLastReports,
    reportesGetReport, 
    reportesPost,
    reportesDelete,
    reportesPut
};