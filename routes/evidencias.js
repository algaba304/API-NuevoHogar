const {Router} = require('express');
const { 
    evidenciasGet,
    evidenciasDeleteOne,
    evidenciasDeleteAll,
    evidenciasPost } = require('../controllers/evidencias');

const router = Router();

router.get('/:idR', evidenciasGet);

router.post('/', evidenciasPost);

router.delete('/deleteOne/:idE', evidenciasDeleteOne);

router.delete('/deleteAll/:idR', evidenciasDeleteAll);

module.exports = router;