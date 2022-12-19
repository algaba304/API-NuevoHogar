const Usuario = require('../models/usuarios');
const error500 = "Ocurrió un error inesperado";

const editarAccesoGenerico = async (res, id, estadoUsuario) => {

    try{

        const resultadoRegistro = await new Promise((resolve, reject) => {

            Usuario.editarAccesoDeUsuario(id, estadoUsuario, (err, result) => {
        
                (err) ? reject(err) : resolve(result);
        
            });
        
        });

        if(resultadoRegistro.affectedRows === 1 && estadoUsuario === "Eliminado"){
            
            return res.status(200).send({

                mensaje : "Se eliminó la cuenta exitosamente"
            
            });

        }else if(resultadoRegistro.affectedRows === 1){
        
            return res.status(200).send({

                mensaje : "Se editó el acceso del usuario exitosamente"
            
            });
        
        }else{
        
            return res.status(500).send({
                
                mensaje : error500
            
            });
        
        }

    }catch(err){

        return res.status(500).send({
            
            mensaje : error500
        
        });

    }

}

module.exports = {
    
    editarAccesoGenerico

};