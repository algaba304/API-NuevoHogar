const Router = require('express');
const { iniciarSesion } = require('../controllers/usuarios');

const router = new Router();

router.get('/', iniciarSesion);

module.exports = router;