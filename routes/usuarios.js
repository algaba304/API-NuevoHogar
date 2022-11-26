const {Router} = require('express');
const { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosPatch, 
    usuauriosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet); 
  
router.post('/', usuariosPost);  

router.put('/:id', usuariosPut);  

router.patch('/', usuariosPatch);  

router.delete('/', usuauriosDelete);  


module.exports = router;