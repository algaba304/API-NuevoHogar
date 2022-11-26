const {Router} = require('express');
const { 
    escuelasGet,
    escuelasGetById,
    escuelasPost,
    escuelasPut,
    escuelasPatch,
    escuelasDelete } = require('../controllers/escuelas');

const router = Router();

router.get('/', escuelasGet); 

router.get('/:id', escuelasGetById); 

router.post('/',escuelasPost);

router.put('/:id',escuelasPut);

router.delete('/:id',escuelasDelete);
  


module.exports = router;