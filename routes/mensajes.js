const {Router} = require('express');
const { 
    mensajesGetLastMessage,
    mensajesGetLastMessages,
    mensajesPost,
    mensajesDeleteOne,
    mensajesDeleteAll} = require('../controllers/mensajes');

const router = Router();

router.get('/lastMessage/:idC', mensajesGetLastMessage); 

router.get('/lastMessages/:idC', mensajesGetLastMessages);
  
router.post('/', mensajesPost);

router.delete('/oneMessage/:idC', mensajesDeleteOne);  

router.delete('/allMessage/:idC', mensajesDeleteAll); 

module.exports = router;