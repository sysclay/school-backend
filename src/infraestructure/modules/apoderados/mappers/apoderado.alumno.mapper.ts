// import { ApoderadoAlumnoEntity, ApoderadoAlumnoEntityOu } from "../../../../domain/modulos/ApoderadoAlumno/index.js";
// import { CustomError } from "../../../../domain/index.js";

import { ApoderadoAlumnoEntity, ApoderadoAlumnoEntityOu, CustomError } from "../../../../domain/index.js";


export class ApoderadoAlumnoMapper {

    static apoderadoalumnoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre_institucion){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.correo){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new ApoderadoAlumnoEntity (
                data.id_apoderado,
                data.id_apoderado_alumno,
                data.id_alumno,
                data.tipo_doc,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.genero,
                data.foto,
                data.correo,
                data.telefono,
                data.direccion,
                data.qr,
            );   
            return new ApoderadoAlumnoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new ApoderadoAlumnoEntityOu(
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
            const _data = new ApoderadoAlumnoEntity (
                data.id_apoderado,
                data.id_apoderado_alumno,
                data.id_alumno,
                data.tipo_doc,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.genero,
                data.foto,
                data.correo,
                data.telefono,
                data.direccion,
                data.qr,
            );

            return new ApoderadoAlumnoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new ApoderadoAlumnoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_apoderado,id_apoderado_alumno,id_alumno,tipo_doc,nro_doc,nombre,paterno,materno,genero,foto,correo,telefono,direccion,qr} = object;   
                return new ApoderadoAlumnoEntity(
                    id_apoderado,
                    id_apoderado_alumno,
                    id_alumno,
                    tipo_doc,
                    nro_doc,
                    nombre,
                    paterno,
                    materno,
                    genero,
                    foto,
                    correo,
                    telefono,
                    direccion,
                    qr,
                )
            })
            return new ApoderadoAlumnoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new ApoderadoAlumnoEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}