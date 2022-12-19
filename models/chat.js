const dbConn = require('../config/db.config');

let Chat = (chat) => {
    this.idChat = chat.idChat;
    this.descripcion = chat.descripcion;
    this.nombre = chat.nombre;
    this.fechaCreacion = chat.fechaCreacion;
};

Chat.getReportChat = (idR, callback) => {
    let sqlQuery = "select c.idChat, c.descripcion, c.nombre, c.fechaCreacion from Chat c inner join ReporteDeMaltrato r on c.descripcion = r.idReporteDeMaltrato where r.idReporteDeMaltrato = ?";
    dbConn.query(sqlQuery, idR, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Chat.getUserChats = (idU, callback) => {
    let sqlQuery = "select c.idChat, c.descripcion, c.nombre, c.fechaCreacion from Chat c inner join Participa p on c.idChat = p.idChat where idUsuario = ?";
    dbConn.query(sqlQuery, idU, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Chat.getById = (clave, callback) => {
    dbConn.query("Select * from Chat where idChat = ? ", clave, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Chat.deleteById = (clave, callback) => {
    let sqlQuery = "DELETE FROM Chat WHERE  idChat= ?";
    dbConn.query(sqlQuery, clave, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res);
    });
};

Chat.create = (data, callback) => {
    let sqlQuery = "INSERT INTO Chat SET ?";
    dbConn.query(sqlQuery, data, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

module.exports = Chat;