const {Router} = require('express');
const { 
    reportesGetLastReports,
    reportesGetReport, 
    reportesPost,
    reportesDelete,
    reportesPut} = require('../controllers/reportes');

const router = Router();

router.get('/lastReports/:num', reportesGetLastReports); 

router.get('/:idR', reportesGetReport);
  
router.post('/', reportesPost);

router.put('/:id', reportesPut);

router.delete('/:idR', reportesDelete);

module.exports = router;