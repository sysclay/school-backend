import { CustomError, MatriculaEntity, MatriculaEntityOu } from "../../../../domain/index.js";

export class MatriculaMapper {

    static matriculaEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message, total,page,limit, totalPages} = object;
        if(data!==undefined){
            const _data = new MatriculaEntity (
                data.id_matricula,
                data.id_anio_academico_colegio,
                data.id_grupo_academico,
                data.id_colegio,
                data.id_nivel,
                data.id_grado,
                data.id_seccion,
                data.id_alumno,
                data.nro_documento,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.nivel,
                data.grado,
                data.seccion,
                data.turno,
                data.hora_inicio,
                data.hora_fin,
                data.tipo_ingreso,
                data.tipo_estado,
                data.estado,
            );   
            return new MatriculaEntityOu(
                ok,
                _data, 
                message,
                total,
                page,
                limit,
                totalPages,
            );            
        }else{
            return new MatriculaEntityOu(
                ok,
                data, 
                message,
                total,
                page,
                limit,
                totalPages,
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message, total,page,limit, totalPages} = object;
        var _data:any
        if(data){
            const _data = new MatriculaEntity (
                data.id_matricula,
                data.id_anio_academico_colegio,
                data.id_grupo_academico,
                data.id_colegio,
                data.id_nivel,
                data.id_grado,
                data.id_seccion,
                data.id_alumno,
                data.nro_documento,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.nivel,
                data.grado,
                data.seccion,
                data.turno,
                data.hora_inicio,
                data.hora_fin,
                data.tipo_ingreso,
                data.tipo_estado,
                data.estado,
            );
            return new MatriculaEntityOu(
                ok,
                _data,
                message,
                total,
                page,
                limit,
                totalPages,
            );
        }

        return new MatriculaEntityOu(
            ok,
            _data,
            message,
            total,
            page,
            limit,
            totalPages,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message,total,page,limit, totalPages} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_matricula,id_anio_academico_colegio,id_grupo_academico,id_colegio,id_nivel,id_grado,id_seccion,id_alumno,nro_documento, nombre, paterno, materno, telefono,correo,nivel,grado,seccion,turno,hora_inicio,hora_fin,tipo_ingreso,tipo_estado, estado } = object;
                return new MatriculaEntity(
                    id_matricula,
                    id_anio_academico_colegio,
                    id_grupo_academico,
                    id_colegio,
                    id_nivel,
                    id_grado,
                    id_seccion,
                    id_alumno,
                    nro_documento,
                    nombre,
                    paterno,
                    materno,
                    telefono,
                    correo,
                    nivel,
                    grado,
                    seccion,
                    turno,
                    hora_inicio,
                    hora_fin,
                    tipo_ingreso,
                    tipo_estado,
                    estado,
                )
            })

            return new MatriculaEntityOu(
                ok,
                _data, 
                message,
                total,
                page,
                limit,
                totalPages,
            )
        }else{
            return new MatriculaEntityOu(
                ok,
                data, 
                message,
                total,
                page,
                limit,
                totalPages,
            )
        }

    }
}