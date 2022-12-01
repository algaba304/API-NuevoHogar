const {Router} = require('express');
const { 
    crearUsuario, 
    editarUsuarioReportado, 
    editarAccesoDeUsuario,
    getListaUsuarios, 
    buscarUsuario,
    getUsuarioRegistrado,
    usuauriosDelete} = require('../controllers/usuarios');

const router = Router();

router.get('/', getListaUsuarios); 

router.get('/sesion', getUsuarioRegistrado);

router.get('/:usuario/reportados', buscarUsuario);
  
router.post('/', crearUsuario);  

router.put('/:id/estados', editarAccesoDeUsuario);

router.put('/:id/reportados', editarUsuarioReportado);

router.delete('/:id', usuauriosDelete);  

module.exports = router;