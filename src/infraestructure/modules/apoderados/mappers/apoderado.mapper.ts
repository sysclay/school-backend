// import { ApoderadoEntity, ApoderadoEntityOu } from "../../../../domain/modulos/Apoderado/index.js";
// import { CustomError } from "../../../../domain/index.js";

import { ApoderadoEntity, ApoderadoEntityOu, CustomError } from "../../../../domain/index.js";


export class ApoderadoMapper {

    static apoderadoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre_institucion){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.correo){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new ApoderadoEntity (
                data.id_colegio,
                data.colegio,
                data.id_apoderado,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.estado,
                data.created_at,
            );   
            return new ApoderadoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new ApoderadoEntityOu(
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
            const _data = new ApoderadoEntity (
                data.id_colegio,
                data.colegio,
                data.id_apoderado,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.estado,
                data.created_at,
            );
            return new ApoderadoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new ApoderadoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_colegio,colegio,id_apoderado,nro_doc,nombre,paterno,materno,telefono,correo,estado,created_at} = object;   
                return new ApoderadoEntity(
                    id_colegio,
                    colegio,
                    id_apoderado,
                    nro_doc,
                    nombre,
                    paterno,
                    materno,
                    telefono,
                    correo,
                    estado,
                    created_at,
                )
            })
            return new ApoderadoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new ApoderadoEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}