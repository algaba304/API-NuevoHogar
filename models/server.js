const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();

    }

    middlewares(){

        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static('public'));

    }

    routes(){

        this.app.use('/api/usuarios', require('../routes/usuarios'));
        this.app.use('/api/administradores', require('../routes/administradores'));
        this.app.use('/api/sesion', require('../routes/sesion'));
        this.app.use('/api/roles', require('../routes/roles'));
        this.app.use('/api/metodosDonacion', require('../routes/metodosDonacion'));
        this.app.use('/api/tiposRed', require('../routes/tiposRed'));

    }

    listen(){

        this.app.listen(this.port, () => {

            console.log(`Example app listening on port ${this.port}`);

          });

    }

}

module.exports = Server;