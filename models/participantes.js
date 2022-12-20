const dbConn = require('../config/db.config');

let Participante = (participante) => {
    this.idUsuario = participante.idUsuario;
    this.idChat = participante.idChat;
};

Participante.getChatParticipants = (id, callback) => {
    let sqlQuery = "SELECT * FROM Participa WHERE idChat = ?";
    dbConn.query(sqlQuery, id, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Participante.addParticipant = (data, callback) => {
    let sqlQuery = "insert into Participa SET ?";
    dbConn.query(sqlQuery, data, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Participante.deleteParticipant = (data, callback) => {
    d = [
        data.idUsuario,
        data.idChat
    ];

    let sqlQuery = "delete from Participa where idUsuario = ? and idChat = ?";
    dbConn.query(sqlQuery, d, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

Participante.deleteAllParticipants = (idC, callback) => {
    let sqlQuery = "delete from Participa where idChat = ?";
    dbConn.query(sqlQuery, idC, (err, res) => {
        (err)
            ?callback(err, null)
            :callback(null, res)
    });
};

module.exports = Participante;