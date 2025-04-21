import { CustomError, FcmEntity, FcmEntityOu } from "../../domain/index.js";

export class FcmMapper {

    static FcmEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new FcmEntity (
                data._id||data.id ,
                data.token_fcm, 
                data.device_id,
                data.usuario_id, 
            );   
            return new FcmEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new FcmEntityOu(
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
            const _data = new FcmEntity (
                data._id||data.id ,
                data.token_fcm,
                data.device_id,
                data.usuario_id,
            );
            return new FcmEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new FcmEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, token_fcm,device_id,usuario_id} = object;
                return new FcmEntity(
                    _id||id,
                    token_fcm, 
                    device_id,
                    usuario_id, 
                )
            })

            return new FcmEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new FcmEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}