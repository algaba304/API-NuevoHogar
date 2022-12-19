const { Router } = require('express');
const { getListaRoles } = require('../controllers/roles');

const router = new Router();

router.get('/', getListaRoles);

module.exports = router;