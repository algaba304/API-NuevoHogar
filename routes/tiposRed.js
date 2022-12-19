const { Router } = require('express');
const { getTiposRed } = require('../controllers/refugios');

const router = new Router();

router.get('/', getTiposRed);

module.exports = router;