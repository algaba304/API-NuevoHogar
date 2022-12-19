const { 

    response, 
    request 

} = require('express');
const Rol = require('../models/roles');
const error500 = "Ocurrió un error inesperado";

const getListaRoles = (req = request, res = response) => {

    try{

        Rol.getListaRoles((err, lista) => {

            if(err){

                return res.status(500).send({

                    mensaje : error500

                });

            }else if(lista !== null){

                return res.status(200).send(lista);
    
            }else{
    
                return res.status(204).send();
    
            }

        });

    }catch(err){

        return res.status(500).send({

            mensaje : error500

        });

    }

}

module.exports = { getListaRoles };