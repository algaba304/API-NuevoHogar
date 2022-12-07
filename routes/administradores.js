const {Router} = require('express');
const {
    getListaRefugios,
    getListaUsuariosReportados
} = require('../controllers/administrador');
const router = new Router();

router.get('/:id/refugios', getListaRefugios);

router.get('/:id/usuariosReportados', getListaUsuariosReportados);

module.exports = router;