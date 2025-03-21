import { CustomError, SeccionEntity, SeccionEntityOu } from "../../domain/index.js";

export class SeccionMapper {

    static SeccionEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.seccion){ throw CustomError.badRequest('Missing Seccion'); }
            const _data = new SeccionEntity (
                data._id||data.id ,
                data.seccion, 
                data.grado_id, 
            );   
            return new SeccionEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new SeccionEntityOu(
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
            const _data = new SeccionEntity (
                data._id||data.id ,
                data.seccion, 
                data.grado_id,
            );
            return new SeccionEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new SeccionEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, seccion,grado_id} = object;
                return new SeccionEntity(
                    _id||id,
                    seccion, 
                    grado_id, 
                )
            })

            return new SeccionEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new SeccionEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}