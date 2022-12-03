const Router = require('express');
const {
    getUsuarioRegistrado
} = require('../controllers/usuarios');

const router = new Router();

router.get('/', getUsuarioRegistrado);

module.exports = router;