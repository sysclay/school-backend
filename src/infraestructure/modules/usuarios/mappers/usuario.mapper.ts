import { CustomError, UsuarioEntity, UsuarioEntityOu } from "../../../../domain/index.js";

export class UsuarioMapper {

    static EntityFromObject(object:{[key:string]:any}){
        const {ok,message} = object;
        return new UsuarioEntityOu(
            ok,
            message
        ); 
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){
        const {ok,data,message} = object;
        var _data:any
        if(data){
            const _data = new UsuarioEntity (
                data.id_usuario,
                data.id_persona,
                data.username,
                data.nro_documento,
                data.nombre,
                data.paterno,
                data.materno,
                data.estado,
            );
            return new UsuarioEntityOu(
                ok,
                message,
                _data,
            );
        }

        return new UsuarioEntityOu(
            ok,
            message,
            _data,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, id_usuario,id_persona, username, estado,nro_documento, nombre, paterno,materno} = object;
                return new UsuarioEntity(
                    id_usuario,
                    id_persona,
                    username,
                    nro_documento,
                    nombre,
                    paterno,
                    materno,
                    estado,
                )
            })

            return new UsuarioEntityOu(
                ok,
                message,
                _data, 
            )
        }else{
            return new UsuarioEntityOu(
                ok,
                message,
                data, 
            )
        }
    }
}