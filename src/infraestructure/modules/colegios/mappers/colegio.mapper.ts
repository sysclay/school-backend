// import { ColegioEntity, ColegioEntityOu } from "../../../../domain/modulos/colegio/index.js";
// import { CustomError } from "../../../../domain/index.js";

import { ColegioEntity, ColegioEntityOu, CustomError } from "../../../../domain/index.js";


export class ColegioMapper {

    static colegioEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre_institucion){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.correo){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new ColegioEntity (
                data.id_colegio ,
                data.colegio,
                data.direccion,
                data.correo,
                data.telefono,
                data.estado,
                data.created_at,
                data.cantidad_nivel,
                data.cantidad_grado,
                data.cantidad_seccion,
            );   
            return new ColegioEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new ColegioEntityOu(
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
            const _data = new ColegioEntity (
                data.id_colegio ,
                data.colegio,
                data.direccion,
                data.correo,
                data.telefono,
                data.estado,
                data.created_at,
                data.cantidad_nivel,
                data.cantidad_grado,
                data.cantidad_seccion,
            );
            return new ColegioEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new ColegioEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_colegio,colegio,direccion ,correo, telefono,estado,created_at,cantidad_nivel,cantidad_grado,cantidad_seccion} = object;   
                return new ColegioEntity(
                    id_colegio ,
                    colegio,
                    direccion,
                    correo,
                    telefono,
                    estado,
                    created_at,
                    cantidad_nivel,
                    cantidad_grado,
                    cantidad_seccion,
                )
            })

            return new ColegioEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new ColegioEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}