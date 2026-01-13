// import { ColegioGradoEntity, ColegioGradoEntityOu } from "../../../../domain/modulos/ColegioGrado/index.js";
// import { CustomError } from "../../../../domain/index.js";

import { ColegioGradoEntity, ColegioGradoEntityOu, CustomError } from "../../../../domain/index.js";


export class ColegioGradoMapper {

    static colegioGradoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre_institucion){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.correo){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new ColegioGradoEntity (
                data.id_colegio,
                data.id_nivel,
                data.id_grado,
                data.colegio,
                data.nivel,
                data.grado,
                data.descripcion,
                data.estado,
                data.cantidad_seccion
            );   
            return new ColegioGradoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new ColegioGradoEntityOu(
                ok,
                data, 
                message,
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message} = object;
        var _data:any

        if(data){
            const _data = new ColegioGradoEntity (
                data.id_colegio,
                data.id_nivel,
                data.id_grado,
                data.colegio,
                data.nivel,
                data.grado,
                data.descripcion,
                data.estado,
                data.cantidad_seccion
            );
            return new ColegioGradoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new ColegioGradoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_colegio,id_nivel,id_grado,colegio,nivel,grado,descripcion,estado,cantidad_seccion} = object;   
                return new ColegioGradoEntity(
                    id_colegio,
                    id_nivel,
                    id_grado,
                    colegio,
                    nivel,
                    grado,
                    descripcion,
                    estado,
                    cantidad_seccion
                )
            })

            return new ColegioGradoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new ColegioGradoEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}