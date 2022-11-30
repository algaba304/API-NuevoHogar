const {Router} = require('express');
const { 
    getListaUsuarios, 
    crearUsuario, 
    usuariosPut, 
    editarAccesoDeUsuario,
    usuauriosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', getListaUsuarios); 
  
router.post('/', crearUsuario);  

router.put('/:id', usuariosPut);

router.delete('/:id', usuauriosDelete);  

router.put('/:id/estados', editarAccesoDeUsuario);

module.exports = router;