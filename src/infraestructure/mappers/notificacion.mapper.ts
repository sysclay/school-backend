import { CustomError, NotificacionEntity, NotificacionEntityOu } from "../../domain/index.js";

export class NotificacionMapper {

    static NotificacionEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.token_fcm){ throw CustomError.badRequest('Missing fcm'); }
            if(!data.apoderado_id){ throw CustomError.badRequest('Missing apoderado_id'); }
            const _data = new NotificacionEntity (
                data._id||data.id ,
                // data.token_fcm,
                data.apoderado_id,
            );   
            return new NotificacionEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new NotificacionEntityOu(
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
            const _data = new NotificacionEntity (
                data._id||data.id ,
                // data.token_fcm,
                data.apoderado_id,
            );
            return new NotificacionEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new NotificacionEntityOu(
            ok,
            _data,
            message,
        );
    }

    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id,apoderado_id } = object;
                return new NotificacionEntity(
                    _id||id,
                    // token_fcm,
                    apoderado_id,
                )
            })

            return new NotificacionEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new NotificacionEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}