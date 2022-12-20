const { 

    request, 
    response

} = require('express');
const multer = require('multer');
const path = require('path');
const Usuario = require('../models/usuarios');
const error500 = "Ocurrió un error inesperado";

var nombreImagen;

const almacenamiento = multer.diskStorage({

    destination : function(req, file, cb){

        cb(null, 'public/perfilesDeUsuario');

    },

    filename : function(req, file, cb){
        
        rutaImagen = `${Date.now()}-${file.originalname}`;
        cb(null, nombreImagen);

    }

});

const cargador = multer({

    storage : almacenamiento

});

const subir = cargador.single('imagen');

const subirImagen = async (req = request, res = response) => {

    const { id } = req.params;
    const rutaImagen = path.join(__dirname, nombreImagen);
    console.log(__dirname);
    /*
    const resultadoRegistro = await new Promise((resolve, reject) => {

        
        Usuario.guardarRutaImagen(id, nombreImagen, (err, result) => {

            if(err) return res.status(500).send({
    
                mensaje : error500
    
            });
    
            resolve(result);
    
        });

    });

    if(resultadoRegistro.affectedRows === 1){

        return res.status(200).send({
            
            mensaje : "Imagen guardada correctamente"

        });

    }else{

        return res.status(500).send({

            mensaje : error500

        });

    }*/

}

module.exports = {

    subir,
    subirImagen

}