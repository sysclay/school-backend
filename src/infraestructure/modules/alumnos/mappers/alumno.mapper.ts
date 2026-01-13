// import { AlumnoEntity, AlumnoEntityOu } from "../../../../domain/modulos/Alumno/index.js";
// import { CustomError } from "../../../../domain/index.js";

import { AlumnoEntity, AlumnoEntityOu, CustomError } from "../../../../domain/index.js";


export class AlumnoMapper {

    static alumnoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre_institucion){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.correo){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new AlumnoEntity (
                data.id_colegio,
                data.colegio,
                data.id_alumno,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.qr_code,
                data.estado,
                data.created_at,
            );   
            return new AlumnoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new AlumnoEntityOu(
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
            const _data = new AlumnoEntity (
                data.id_colegio,
                data.colegio,
                data.id_alumno,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.qr_code,
                data.estado,
                data.created_at,
            );
            return new AlumnoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new AlumnoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_colegio,colegio,id_alumno,qr_code,nro_doc,nombre,paterno,materno,telefono,correo,estado,created_at} = object;   
                return new AlumnoEntity(
                    id_colegio,
                    colegio,
                    id_alumno,
                    nro_doc,
                    nombre,
                    paterno,
                    materno,
                    telefono,
                    correo,
                    qr_code,
                    estado,
                    created_at,
                )
            })

            return new AlumnoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new AlumnoEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}