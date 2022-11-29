const {Router} = require('express');
const { 
    usuariosGet, 
    crearUsuario, 
    usuariosPut, 
    usuauriosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet); 
  
router.post('/', crearUsuario);  

router.put('/:id', usuariosPut);

router.delete('/:id', usuauriosDelete);  


module.exports = router;