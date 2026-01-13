import { CustomError, PermisoEntity, PermisoEntityOu } from "../../../../domain/index.js";

export class PermisoMapper {

    static permisoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.matricula_id){ throw CustomError.badRequest('Missing matricula'); }
            const _data = new PermisoEntity (
                data.id_permiso,
                data.codigo_permiso,
                data.nombre_permiso,
                data.descripcion,
                data.estado,
            );   
            return new PermisoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new PermisoEntityOu(
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
            const _data = new PermisoEntity (
                data.id_permiso,
                data.codigo_permiso,
                data.nombre_permiso,
                data.descripcion,
                data.estado,
            );
            return new PermisoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new PermisoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_permiso,codigo_permiso,nombre_permiso,descripcion,estado} = object;
                return new PermisoEntity(   
                    id_permiso,
                    codigo_permiso,
                    nombre_permiso,
                    descripcion,
                    estado,
                )
            })

            return new PermisoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new PermisoEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}