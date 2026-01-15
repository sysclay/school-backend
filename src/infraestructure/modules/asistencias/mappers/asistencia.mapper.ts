// import { CustomError, AsistenciaEntity, AsistenciaEntityOu } from "../../../../../domain/index.js";

import { CustomError, AsistenciaEntity, AsistenciaEntityOu } from "../../../../domain/index.js";

export class AsistenciaMapper {

    static asistenciaEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message, meta} = object;
        if(data!==undefined){
            const _data = new AsistenciaEntity (
                data.id,
                data.id_matricula,
                data.fecha,
                data.hora_entrada,
                data.hora_llegada,
                data.hora_salida,
                data.registrador_entrada,
                data.registrador_salida,
                data.asistencia,
                // data.cantidad_seccion
            );   
            return new AsistenciaEntityOu(
                ok,
                _data, 
                message,
                meta,
            );            
        }else{
            return new AsistenciaEntityOu(
                ok,
                data, 
                message,
                meta
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message, meta} = object;
        var _data:any

        if(data){
            const _data = new AsistenciaEntity (
                data.id,
                data.id_matricula,
                data.fecha,
                data.hora_entrada,
                data.hora_llegada,
                data.hora_salida,
                data.registrador_entrada,
                data.registrador_salida,
                data.asistencia,
                // data.cantidad_seccion,
            );
            return new AsistenciaEntityOu(
                ok,
                _data,
                message,
                meta,
            );
        }

        return new AsistenciaEntityOu(
            ok,
            _data,
            message,
            meta,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message,meta} = object;
        // console.log('OBJECT::',object)
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id, id_matricula, fecha,hora_llegada,hora_entrada,hora_salida,registrador_entrada,registrador_salida,asistencia} = object;
                return new AsistenciaEntity(
                    id,
                    id_matricula,
                    fecha,
                    hora_entrada,
                    hora_llegada,
                    hora_salida,
                    registrador_entrada,
                    registrador_salida,
                    asistencia,
                    // cantidad_seccion,
                )
            })

            return new AsistenciaEntityOu(
                ok,
                _data, 
                message,
                meta,
            )
        }else{
            return new AsistenciaEntityOu(
                ok,
                data, 
                message,
                meta,
            )
        }
    }
}