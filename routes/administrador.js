const {Router} = require('express');

const {
    getListaRefugios
} = require('../controllers/administrador');

const router = new Router();

router.get('/', getListaRefugios);

module.exports = router;