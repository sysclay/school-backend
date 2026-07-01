import { CustomError, ModuloEntity, ModuloEntityOu } from "../../../../domain/index.js";

export class ModuloMapper {

    static ModuloEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.matricula_id){ throw CustomError.badRequest('Missing matricula'); }
            const _data = new ModuloEntity (
                data.id_modulo,
                data.codigo_modulo,
                data.nombre_modulo,
                data.descripcion,
                data.estado,
            );   
            return new ModuloEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new ModuloEntityOu(
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
            const _data = new ModuloEntity (
                data.id_modulo,
                data.codigo_modulo,
                data.nombre_modulo,
                data.descripcion,
                data.estado,
            );
            return new ModuloEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new ModuloEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_modulo,nombre_modulo,codigo_modulo,descripcion,estado} = object;
                return new ModuloEntity(   
                    id_modulo,
                    codigo_modulo,
                    nombre_modulo,
                    descripcion,
                    estado,
                )
            })

            return new ModuloEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new ModuloEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}