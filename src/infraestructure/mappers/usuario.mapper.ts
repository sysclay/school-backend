import { CustomError, UsuarioEntity, UsuarioEntityOu } from "../../domain/index.js";

export class UsuarioMapper {

    static UsuarioEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.nro_documento){ throw CustomError.badRequest('Missing Usuario'); }
            const _data = new UsuarioEntity (
                data._id||data.id ,
                data.nro_documento,
                data.correo, 
                data.telefono, 
                data.token, 
            );   
            return new UsuarioEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new UsuarioEntityOu(
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
            const _data = new UsuarioEntity (
                data._id||data.id ,
                data.nro_documento,
                data.correo, 
                data.telefono, 
                data.token, 
            );
            return new UsuarioEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new UsuarioEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, nro_documento,correo,telefono, token} = object;
                return new UsuarioEntity(
                    _id||id,
                    nro_documento, 
                    correo, 
                    telefono, 
                    token
                )
            })

            return new UsuarioEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new UsuarioEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}