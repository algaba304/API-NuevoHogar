const { Router } = require('express');
const { 

    subir,
    subirImagen 

} = require('../controllers/perfilesDeUsuarios');
const { 

    bloquearUsuario,
    editarSolicitudRefugio

} = require('../controllers/administrador');
const { 

    crearCuenta, 
    editarCuenta,
    reportarUsuario, 
    eliminarCuenta,
    getListaUsuarios

} = require('../controllers/usuarios');
const {

    consultarListaEnlacesDonacion,
    consultarListaRedesSociales,
    guardarMetodos,
    guardarRedes
    
} = require('../controllers/refugios');

const router = Router();

router.get('/', getListaUsuarios); 

router.get('/:id/donaciones', consultarListaEnlacesDonacion);

router.get('/:id/redesSociales', consultarListaRedesSociales);
  
router.post('/', crearCuenta);  

router.put('/:id', editarCuenta);

router.put('/:id/cuentas', eliminarCuenta);

router.put('/:id/solicitudes', editarSolicitudRefugio);

router.put('/:id/permisos', bloquearUsuario);

router.put('/:id/reportados', reportarUsuario);

router.put('/:id/donaciones', guardarMetodos);

router.put('/:id/redesSociales', guardarRedes);

router.post('/perfiles', subir, subirImagen);

module.exports = router;