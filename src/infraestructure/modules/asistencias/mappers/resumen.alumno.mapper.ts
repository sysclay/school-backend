// import { CustomError, ResumenAlumnoEntity, ResumenAlumnoEntityOu } from "../../../../../domain/index.js";

import { CustomError, ResumenAlumnoEntity, ResumenAlumnoEntityOu } from "../../../../domain/index.js";

export class ResumenAlumnoMapper {

    static resumenAlumnoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message, meta} = object;
        if(data!==undefined){
            const _data = new ResumenAlumnoEntity (
                data.id_programado,
                data.fecha,
                data.mes,
                data.anio,
                data.id_alumno,
                data.codigo_alumno,
                data.dia_semana,
                data.hora_inicio,
                data.hora_fin,
                data.estado_asistencia,
                data.hora_llegada,
                data.hora_salida,
                data.justificacion
            );   
            return new ResumenAlumnoEntityOu(
                ok,
                _data, 
                message,
                // meta,
            );            
        }else{
            return new ResumenAlumnoEntityOu(
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
            const _data = new ResumenAlumnoEntity (
                data.id_programado,
                data.fecha,
                data.mes,
                data.anio,
                data.id_alumno,
                data.codigo_alumno,
                data.dia_semana,
                data.hora_inicio,
                data.hora_fin,
                data.estado_asistencia,
                data.hora_llegada,
                data.hora_salida,
                data.justificacion
            );
            return new ResumenAlumnoEntityOu(
                ok,
                _data,
                message,
                // meta,
            );
        }

        return new ResumenAlumnoEntityOu(
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
                const {id_programado, fecha, mes, anio, id_alumno, codigo_alumno, dia_semana, hora_inicio, hora_fin, estado_asistencia, hora_llegada, hora_salida, justificacion} = object;
                return new ResumenAlumnoEntity(
                    id_programado,
                    fecha,
                    mes,
                    anio,
                    id_alumno,
                    codigo_alumno,
                    dia_semana,
                    hora_inicio,
                    hora_fin,
                    estado_asistencia,
                    hora_llegada,
                    hora_salida,
                    justificacion
                )
            })

            return new ResumenAlumnoEntityOu(
                ok,
                _data, 
                message,
                // meta,
            )
        }else{
            return new ResumenAlumnoEntityOu(
                ok,
                data, 
                message,
                // meta,
            )
        }
    }
}