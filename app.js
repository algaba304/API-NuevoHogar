require('dotenv').config();

const Server = require('./models/server');

const ser = new Server();

ser.listen();
