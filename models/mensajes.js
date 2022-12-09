const dbConn = require('../config/db.config');

let Mensaje = (mensaje) => {
    this.idMensaje = mensaje.idMensaje;
    this.mensaje = mensaje.mensaje;
    this.fechaHoraEnvio = mensaje.fechaHoraEnvio;
    this.idChat = mensaje.idChat;
    this.idUsuario = mensaje.idUsuario;
};

Mensaje.getLastMessage = (chat, callback) => {
    dbConn.query("select * from Mensaje where idChat = ? and fechaHoraEnvio = (select max(fechaHoraEnvio) from Mensaje)",
    chat, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Mensaje.getLastMessages =(chat, number, callback) => {
    dbConn.query("select * from Mensaje where idChat = ? order by fechaHoraEnvio desc limit ?", chat, number, (err, res) => {
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