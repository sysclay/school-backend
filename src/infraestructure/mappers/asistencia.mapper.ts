import { CustomError, AsistenciaEntity, AsistenciaEntityOu } from "../../domain/index.js";

export class AsistenciaMapper {

    static AsistenciaEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.matricula_id){ throw CustomError.badRequest('Missing matricula'); }
            const _data = new AsistenciaEntity (
                data._id||data.id ,
                data.matricula_id,
                data.hora_entrada,
                data.hora_salida,
                data.registrador_entrada,
                data.registrador_salida,
                data.tardanza,
                data.falta,
            );   
            return new AsistenciaEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new AsistenciaEntityOu(
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
            const _data = new AsistenciaEntity (
                data._id||data.id ,
                data.matricula_id,
                data.hora_entrada,
                data.hora_salida,
                data.registrador_entrada,
                data.registrador_salida,
                data.tardanza,
                data.falta,
            );
            return new AsistenciaEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new AsistenciaEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, matricula_id,hora_entrada,hora_salida, registrador_entrada,registrador_salida, tardanza, falta} = object;
                return new AsistenciaEntity(
                    _id||id,
                    matricula_id,
                    hora_entrada,
                    hora_salida,
                    registrador_entrada,
                    registrador_salida,
                    tardanza,
                    falta,
                )
            })

            return new AsistenciaEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new AsistenciaEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}