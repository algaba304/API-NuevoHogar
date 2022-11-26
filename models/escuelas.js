const dbConn = require('../config/db.config');


let Escuela = (escuela) => {
    this.clave = escuela.clave;
    this.nombre = escuela.nombre;
    this.domicilio = escuela.domicilio;
    this.codigoPostal = escuela.codigoPostal;
    this.turno = escuela.turno;
    this.idLocalidad = escuela.idLocalidad;
    //this.create_at = new Date();
};

Escuela.getAll = (callback) => {
    dbConn.query("Select * from Escuelas", (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Escuela.getById = (clave, callback) => {
    dbConn.query("Select * from Escuelas where claveEscuela = ? ", clave, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Escuela.create = (data, callback) => {
    let sqlQuery = "INSERT INTO Escuelas SET ?";
    dbConn.query(sqlQuery, data, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Escuela.update = (clave, esc, callback) => {
    data = [
        esc.clave,
        esc.nombre,
        esc.domicilio,
        esc.codigoPostal,
        esc.turno,
        esc.idLocalidad,
        clave
    ];
    let sqlQuery = "UPDATE Escuelas SET claveEscuela = ?, nombre = ?, domicilio = ?, codigoPostal = ?, turno = ?, idLocalidad = ? WHERE clave = ?";
    dbConn.query(sqlQuery, data, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)

    });
};

Escuela.delete = (clave, callback) => {
    let sqlQuery = "DELETE FROM Escuelas WHERE claveEscuela = ?";
    dbConn.query(sqlQuery, clave, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res);
    });
};

Escuela.deleteEscuelaInforme = (clave, callback) => {
    let sqlQuery = "DELETE FROM EscuelaInforme WHERE claveEscuela = ?";
    dbConn.query(sqlQuery, clave, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res);
    });
}

module.exports = Escuela;
