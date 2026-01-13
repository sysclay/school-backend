// import { CustomError, AsistenciaProgramadoEntity, AsistenciaProgramadoEntityOu } from "../../../../../domain/index.js";

import { CustomError, AsistenciaProgramadoEntity, AsistenciaProgramadoEntityOu } from "../../../../domain/index.js";

export class AsistenciaProgramadoMapper {

    private static formatDate(date: any): string {
        if (!date) throw new Error('Fecha inválida o inexistente');null;
        if (date instanceof Date) { return date.toISOString().split('T')[0];
}
        // Por si ya viene como string ISO
        return new Date(date).toISOString().split('T')[0];
    }

    static asistenciaprogramadoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new AsistenciaProgramadoEntity (
                data.id_asistencia_programado,
                data.id_grupo_academico,
                AsistenciaProgramadoMapper.formatDate(data.fecha), // ✅
                // data.fecha, // ✅
                data.hora_inicio,
                data.hora_fin,
                data.estado,
                // data.descripcion,
                // data.estado,
                // data.cantidad_seccion
            );   
            return new AsistenciaProgramadoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new AsistenciaProgramadoEntityOu(
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
            const _data = new AsistenciaProgramadoEntity (
                data.id_asistencia_programado,
                data.id_grupo_academico,
                AsistenciaProgramadoMapper.formatDate(data.fecha),
                // data.fecha,
                data.hora_inicio,
                data.hora_fin,
                data.estado,
                // data.descripcion,
                // data.estado,
                // data.cantidad_seccion,
            );
            return new AsistenciaProgramadoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new AsistenciaProgramadoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_asistencia_programado,id_grupo_academico,fecha,hora_inicio, hora_fin,estado} = object;
                return new AsistenciaProgramadoEntity(
                    id_asistencia_programado,
                    id_grupo_academico,
                    AsistenciaProgramadoMapper.formatDate(fecha),
                    // fecha,
                    hora_inicio,
                    hora_fin,
                    estado,
                    // descripcion,
                    // estado,
                    // cantidad_seccion,
                )
            })

            return new AsistenciaProgramadoEntityOu(
                ok,
                _data,
                message,
            )
        }else{
            return new AsistenciaProgramadoEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}