const dbConn = require('../config/db.config');

let Chat = (chat) => {
    this.idChat = chat.idChat;
    this.nombre = chat.nombre;
    this.descripcion = chat.descripcion;
    this.fechaCreacion = chat.fechaCreacion;
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

Chat.addParticipant = (idC, idU, callback) => {
    let sqlQuery = "insert into Participa SET idUsuario = ?, idChat = ?";
    dbConn.query(sqlQuery, idU, idC, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Chat.deleteParticipant = (idC, idU, callback) => {
    let sqlQuery = "delete from Participa where idChat = ? and idUsuario = ?";
    dbConn.query(sqlQuery, idC, idU, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Chat.deleteAllParticipants = (idC, callback) => {
    let sqlQuery = "delete from Participa where idChat = ?";
    dbConn.query(sqlQuery, idC, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

