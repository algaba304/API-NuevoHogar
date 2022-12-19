const { Router } = require('express');
const { getMetodosDonacion } = require('../controllers/refugios');

const router = new Router();

router.get('/', getMetodosDonacion);

module.exports = router;