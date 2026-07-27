// import { CustomError, AsistenciaEntity, AsistenciaEntityOu } from "../../../../../domain/index.js";

import { CustomError, AsistenciaEntity, AsistenciaEntityOu, ResumenMonthEntity, ResumenMonthEntityOu } from "../../../../domain/index.js";

export class ResumenMonthMapper {

    static asistenciaEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message, meta} = object;
        if(data!==undefined){
            const _data = new ResumenMonthEntity (
                data.cod_colegio,
                data.colegio,
                data.cod_anio_academico,
                data.cod_grupo,
                data.grupo_academico,
                data.anio,
                data.mes,
                data.dias_lectivos,
                data.matriculados,
                data.sin_registro,
                data.porcentaje_sin_registro,
                data.puntual,
                data.porcentaje_puntual,
                data.tarde,
                data.porcentaje_tarde,
                data.sin_salida,
                data.porcentaje_sin_salida,
                data.ausente,
                data.porcentaje_ausente,
                data.justificado,
                data.porcentaje_justificado,
            );   
            return new ResumenMonthEntityOu(
                ok,
                _data, 
                message,
                // meta,
            );            
        }else{
            return new ResumenMonthEntityOu(
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
            const _data = new ResumenMonthEntity (
                data.cod_colegio,
                data.colegio,
                data.cod_anio_academico,
                data.cod_grupo,
                data.grupo_academico,
                data.anio,
                data.mes,
                data.dias_lectivos,
                data.matriculados,
                data.sin_registro,
                data.porcentaje_sin_registro,
                data.puntual,
                data.porcentaje_puntual,
                data.tarde,
                data.porcentaje_tarde,
                data.sin_salida,
                data.porcentaje_sin_salida,
                data.ausente,
                data.porcentaje_ausente,
                data.justificado,
                data.porcentaje_justificado,
            );
            return new ResumenMonthEntityOu(
                ok,
                _data,
                message,
                // meta,
            );
        }

        return new ResumenMonthEntityOu(
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
                const {cod_colegio,colegio,cod_anio_academico,cod_grupo, grupo_academico, anio, mes, dias_lectivos,matriculados,sin_registro,porcentaje_ausente,
                    porcentaje_sin_registro, puntual, porcentaje_puntual, tarde, porcentaje_tarde, sin_salida, porcentaje_sin_salida,
                    ausente, justificado, porcentaje_justificado
                } = object;
                return new ResumenMonthEntity(
                    cod_colegio,
                    colegio,
                    cod_anio_academico,
                    cod_grupo,
                    grupo_academico,
                    anio,
                    mes,
                    dias_lectivos,
                    matriculados,
                    sin_registro,
                    porcentaje_sin_registro,
                    puntual,
                    porcentaje_puntual,
                    tarde,
                    porcentaje_tarde,
                    sin_salida,
                    porcentaje_sin_salida,
                    ausente,
                    porcentaje_ausente,
                    justificado,
                    porcentaje_justificado,
                )
            })

            return new ResumenMonthEntityOu(
                ok,
                _data, 
                message,
                // meta,
            )
        }else{
            return new ResumenMonthEntityOu(
                ok,
                data, 
                message,
                // meta,
            )
        }
    }
}