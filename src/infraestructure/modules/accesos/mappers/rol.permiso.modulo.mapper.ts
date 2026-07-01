import { CustomError, RolPermisoModuloEntity, RolPermisoModuloEntityOu } from "../../../../domain/index.js";

export class RolPermisoModuloMapper {

    static EntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.rol_id){ throw CustomError.badRequest('Missing Rol'); }
            const _data = new RolPermisoModuloEntity (
                data.id_rol,
                data.id_modulo,
                data.id_permiso,
                data.nombre_rol,
                data.nombre_modulo,
                data.nombre_permiso,
                data.created_at,
                data.estado,
            );   
            return new RolPermisoModuloEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new RolPermisoModuloEntityOu(
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
            const _data = new RolPermisoModuloEntity (
                data.id_rol,
                data.id_modulo,
                data.id_permiso,
                data.nombre_rol,
                data.nombre_modulo,
                data.nombre_permiso,
                data.created_at,
                data.estado,
            );
            return new RolPermisoModuloEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new RolPermisoModuloEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_rol,nombre_rol,id_modulo,nombre_modulo,id_permiso,nombre_permiso,estado,created_at} = object;
                return new RolPermisoModuloEntity(
                    id_rol,
                    id_modulo,
                    id_permiso,
                    nombre_rol,
                    nombre_modulo,
                    nombre_permiso,
                    created_at,
                    estado,
                )
            })

            return new RolPermisoModuloEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new RolPermisoModuloEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}