import { CustomError, TokenEntity, TokenEntityOu } from "../../domain/index.js";

export class TokenMapper {

    static TokenEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new TokenEntity (
                data._id||data.id ,
                data.username,
                data.nro_documento,
                data.nombre,
                data.paterno,
                data.materno,
                data.correo,
                data.telefono,
            );   
            return new TokenEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new TokenEntityOu(
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
            const _data = new TokenEntity (
                data._id||data.id ,
                data.username,
                data.nro_documento,
                data.nombre,
                data.paterno,
                data.materno,
                data.correo,
                data.telefono,
            );
            return new TokenEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new TokenEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id,username, nro_documento,nombre,paterno,materno,correo,telefono} = object;
                return new TokenEntity(
                    _id||id, 
                    username,
                    nro_documento,
                    nombre,
                    paterno,
                    materno,
                    correo,
                    telefono,
                )
            })

            return new TokenEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new TokenEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}