import { CustomError, FcmEntity, FcmEntityOu } from "../../../../domain/index.js";

export class FcmMapper {

    static EntityFromObject(object:{[key:string]:any}){
        const {ok,message} = object;
        return new FcmEntityOu(
            ok,
            message
        ); 
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){
        const {ok,data,message} = object;
        var _data:any
        if(data){
            const _data = new FcmEntity (
                data.id_fcm,
                data.id_usuario,
                data.token_fcm,
                data.platform,
                data.last_login,
                data.last_seen,
                data.is_active,
            );
            return new FcmEntityOu(
                ok,
                message,
                _data,
            );
        }

        return new FcmEntityOu(
            ok,
            message,
            _data,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, id_fcm,id_usuario, token_fcm, is_active,platform, last_login, last_seen} = object;
                return new FcmEntity(
                    id_fcm,
                    id_usuario,
                    token_fcm,
                    platform,
                    last_login,
                    last_seen,
                    is_active,
                )
            })

            return new FcmEntityOu(
                ok,
                message,
                _data, 
            )
        }else{
            return new FcmEntityOu(
                ok,
                message,
                data, 
            )
        }
    }
}