const {Router} = require('express');
const { 
    crearUsuario, 
    editarUsuarioReportado, 
    editarAccesoDeUsuario,
    getListaUsuarios, 
    buscarUsuario,
    usuauriosDelete} = require('../controllers/usuarios');

const router = Router();

router.get('/', getListaUsuarios); 

router.get('/:usuario/reportados', buscarUsuario);
  
router.post('/', crearUsuario);  

router.put('/:id/reportados', editarUsuarioReportado);

router.delete('/:id', usuauriosDelete);  

router.put('/:id/estados', editarAccesoDeUsuario);

module.exports = router;