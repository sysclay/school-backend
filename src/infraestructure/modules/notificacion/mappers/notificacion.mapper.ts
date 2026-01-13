// import { CustomError, NotificacionEntity, NotificacionEntityOu } from "../domain/index.js";

import { NotificacionEntity, NotificacionEntityOu } from "../../../../domain/index.js";

export class NotificacionMapper {

    static NotificacionEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new NotificacionEntity (
                data._id||data.id ,
                data.nom_apoderado,
                data.pat_apoderado,
                data.mat_apoderado,
                data.doc_apoderado,
                data.correo,
                data.anio,
                data.device_id,
                data.token_fcm,
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
        if(data){
            const _data = new NotificacionEntity (
                data._id||data.id ,
                data.nom_apoderado,
                data.pat_apoderado,
                data.mat_apoderado,
                data.doc_apoderado,
                data.correo,
                data.anio,
                data.device_id,
                data.token_fcm,
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
                const {_id,id,doc_apoderado,correo,nom_apoderado,pat_apoderado,mat_apoderado,anio,device_id,token_fcm } = object;
                return new NotificacionEntity(
                    _id||id,
                    nom_apoderado,
                    pat_apoderado,
                    mat_apoderado,
                    doc_apoderado,
                    correo,
                    anio,
                    device_id,
                    token_fcm,
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