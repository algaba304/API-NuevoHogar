const dbConn = require('../config/db.config');

let Rol = (rol) => {
    this.idRol = rol.idRol;
    this.nombreRol = rol.nombreRol;
}

module.exports = Rol;