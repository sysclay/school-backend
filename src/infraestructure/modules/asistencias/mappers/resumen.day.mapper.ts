// import { CustomError, ResumenDayEntity, ResumenDayEntityOu } from "../../../../../domain/index.js";

import { CustomError, ResumenDayEntity, ResumenDayEntityOu } from "../../../../domain/index.js";

export class ResumenDayMapper {

    static resumenDayEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message, meta} = object;
        if(data!==undefined){
            const _data = new ResumenDayEntity (
                data.id,
                data.id_asistencia_programada,
                data.fecha,
                data.nombre,
                data.matriculados,
                data.sin_registro,
                data.puntual,
                data.tarde,
                data.sin_salida,
                data.ausente,
                data.justificado,
            );   
            return new ResumenDayEntityOu(
                ok,
                _data, 
                message,
                // meta,
            );            
        }else{
            return new ResumenDayEntityOu(
                ok,
                data, 
                message,
                // meta
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message, meta} = object;
        var _data:any

        if(data){
            const _data = new ResumenDayEntity (
                data.id,
                data.id_asistencia_programada,
                data.fecha,
                data.nombre,
                data.matriculados,
                data.sin_registro,
                data.puntual,
                data.tarde,
                data.sin_salida,
                data.ausente,
                data.justificado,
            );
            return new ResumenDayEntityOu(
                ok,
                _data,
                message,
                // meta,
            );
        }

        return new ResumenDayEntityOu(
            ok,
            _data,
            message,
            // meta,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message,meta} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id, id_asistencia_programada, fecha,nombre,matriculados,sin_registro,puntual,tarde,sin_salida,ausente,justificado} = object;
                return new ResumenDayEntity(
                    id,
                    id_asistencia_programada,
                    fecha,
                    nombre,
                    matriculados,
                    sin_registro,
                    puntual,
                    tarde,
                    sin_salida,
                    ausente,
                    justificado,
                )
            })

            return new ResumenDayEntityOu(
                ok,
                _data, 
                message,
                // meta,
            )
        }else{
            return new ResumenDayEntityOu(
                ok,
                data, 
                message,
                // meta,
            )
        }
    }
}