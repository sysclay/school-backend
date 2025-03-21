import { CustomError, UsuariorolEntity, UsuariorolEntityOu } from "../../domain/index.js";

export class UsuariorolMapper {

    static UsuariorolEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.rol_id){ throw CustomError.badRequest('Missing Usuariorol'); }
            const _data = new UsuariorolEntity (
                data.rol_id,
                data.usuario_id,
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
        // console.log(_data, ok,data,message)
        if(data){
            const _data = new UsuariorolEntity (
                data.rol_id,
                data.usuario_id, 
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
                const {rol_id,usuario_id} = object;
                return new UsuariorolEntity(
                    rol_id,
                    usuario_id,
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