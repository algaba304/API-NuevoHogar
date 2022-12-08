const {Router} = require('express');
const { 
    bloquearUsuario,
    editarSolicitudRefugio
} = require('../controllers/administrador');
const { 
    crearCuenta, 
    editarCuenta,
    editarUsuarioReportado, 
    eliminarCuenta,
    getListaUsuarios, 
    buscarUsuario,
    consultarListaEnlacesDonacion,
    consultarListaRedesSociales,
    usuauriosDelete
} = require('../controllers/usuarios');

const router = Router();

router.get('/', getListaUsuarios); 

router.get('/:usuario/reportados', buscarUsuario);

router.get('/:id/donaciones', consultarListaEnlacesDonacion);

router.get('/:id/redesSociales', consultarListaRedesSociales);
  
router.post('/', crearCuenta);  

router.put('/:id', editarCuenta);

router.put('/:id/cuentas', eliminarCuenta);

router.put('/:id/solicitudes', editarSolicitudRefugio);

router.put('/:id/permisos', bloquearUsuario);

router.put('/:id/reportados', editarUsuarioReportado);

router.delete('/:id', usuauriosDelete);  

module.exports = router;