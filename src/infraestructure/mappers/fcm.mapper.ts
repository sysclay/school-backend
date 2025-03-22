import { CustomError, FcmEntity, FcmEntityOu } from "../../domain/index.js";

export class FcmMapper {

    static FcmEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.fcm){ throw CustomError.badRequest('Missing fcm'); }
            const _data = new FcmEntity (
                data._id||data.id ,
                data.token_fcm, 
                data.apoderado_id, 
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
        // console.log(_data, ok,data,message)
        if(data){
            const _data = new FcmEntity (
                data._id||data.id ,
                data.token_fcm, 
                data.apoderado_id,
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
                const {_id,id, token_fcm,apoderado_id} = object;
                return new FcmEntity(
                    _id||id,
                    token_fcm, 
                    apoderado_id, 
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