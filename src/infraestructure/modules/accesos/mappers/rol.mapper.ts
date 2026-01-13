import { CustomError, RolEntity, RolEntityOu } from "../../../../domain/index.js";

export class RolMapper {

    static EntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.rol_id){ throw CustomError.badRequest('Missing Rol'); }
            const _data = new RolEntity (
                data.id_rol,
                data.codigo_rol,
                data.nombre_rol,
                data.descripcion,
                data.estado,
                data.cantidad_permisos,
                data.cantidad_personas,
            );   
            return new RolEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new RolEntityOu(
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
            const _data = new RolEntity (
                data.id_rol,
                data.codigo_rol,
                data.nombre_rol,
                data.descripcion,
                data.estado,
                data.cantidad_permisos,
                data.cantidad_personas,
            );
            return new RolEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new RolEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_rol,codigo_rol,nombre_rol,estado,descripcion,cantidad_permisos,cantidad_personas} = object;
                return new RolEntity(
                    id_rol,
                    codigo_rol,
                    nombre_rol,
                    descripcion,
                    estado,
                    cantidad_permisos,
                    cantidad_personas,
                )
            })

            return new RolEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new RolEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}