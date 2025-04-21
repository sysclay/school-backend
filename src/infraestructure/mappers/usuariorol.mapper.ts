import { CustomError, UsuariorolEntity, UsuariorolEntityOu } from "../../domain/index.js";

export class UsuariorolMapper {

    static UsuariorolEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.rol_id){ throw CustomError.badRequest('Missing Usuariorol'); }
            const _data = new UsuariorolEntity (
                data.rol_id,
                data.usuario_id,
                data.rol,
            );   
            return new UsuariorolEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new UsuariorolEntityOu(
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
            const _data = new UsuariorolEntity (
                data.rol_id,
                data.usuario_id, 
                data.rol,

            );
            return new UsuariorolEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new UsuariorolEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {rol_id,usuario_id,rol} = object;
                return new UsuariorolEntity(
                    rol_id,
                    usuario_id,
                    rol,
                )
            })

            return new UsuariorolEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new UsuariorolEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}