const {Router} = require('express');
const { 
    crearUsuario, 
    editarUsuarioReportado, 
    editarAccesoDeUsuario,
    getListaUsuarios, 
    buscarUsuario,
    consultarListaEnlacesDonacion,
    consultarListaRedesSociales,
    usuauriosDelete} = require('../controllers/usuarios');

const router = Router();

router.get('/', getListaUsuarios); 

router.get('/:usuario/reportados', buscarUsuario);

router.get('/:id/donaciones', consultarListaEnlacesDonacion);

router.get('/:id/redesSociales', consultarListaRedesSociales);
  
router.post('/', crearUsuario);  

router.put('/:id/reportados', editarUsuarioReportado);

router.delete('/:id', usuauriosDelete);  

router.put('/:id/estados', editarAccesoDeUsuario);

module.exports = router;