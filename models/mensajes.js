const dbConn = require('../config/db.config');

let Mensaje = (mensaje) => {
    this.idMensaje = mensaje.idMensaje;
    this.descripcion = mensaje.descripcion;
    this.fechaHoraEnvio = mensaje.fechaHoraEnvio;
    this.idChat = mensaje.idChat;
    this.idUsuario = mensaje.idUsuario;
    this.nombreUsuario = mensaje.nombreUsuario;
};

Mensaje.getLastMessage = (chat, callback) => {
    let sqlQuery = "select m.idMensaje, m.descripcion, m.descripcion, m.fechaHoraEnvio, m.idChat, "
        + "m.idUsuario, u.nombreUsuario from Mensaje m inner join Usuario u on m.idUsuario = u.idUsuario "  
        + "where m.idChat = ? and m.fechaHoraEnvio = (select max(fechaHoraEnvio) from Mensaje)";
    
        dbConn.query(sqlQuery, chat, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Mensaje.getLastMessages =(chat, num, callback) => {
    n = [num.number];
    let sqlQuery = "select m.idMensaje, m.descripcion, m.descripcion, m.fechaHoraEnvio, m.idChat, "
    + "m.idUsuario, u.nombreUsuario from Mensaje m inner join Usuario u on m.idUsuario = u.idUsuario "
    + "where m.idChat = ? order by fechaHoraEnvio desc limit " + n;

    dbConn.query(sqlQuery, chat, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Mensaje.deleteById = (idMsj, callback) => {
    let sqlQuery = "delete from Mensaje where idMensaje = ?";
    dbConn.query(sqlQuery, idMsj, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res);
    });
};

Mensaje.deleteAllChatMessages = (chat, callback) => {
    let sqlQuery = "delete from Mensaje where idChat = ?";
    dbConn.query(sqlQuery, chat, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res);
    });
}; 

Mensaje.create = (data, callback) => {
    let sqlQuery = "INSERT INTO Mensaje SET ?";
    dbConn.query(sqlQuery, data, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

module.exports = Mensaje;