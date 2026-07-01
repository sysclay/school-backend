// import { PorteroEntity, PorteroEntityOu } from "../../../../domain/modulos/Portero/index.js";
// import { CustomError } from "../../../../domain/index.js";

import { PorteroEntity, PorteroEntityOu, CustomError } from "../../../../domain/index.js";


export class PorteroMapper {

    static porteroEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre_institucion){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.correo){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new PorteroEntity (
                data.id_colegio,
                data.colegio,
                data.id_portero,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.estado,
                data.created_at,
            );   
            return new PorteroEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new PorteroEntityOu(
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
            const _data = new PorteroEntity (
                data.id_colegio,
                data.colegio,
                data.id_portero,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.estado,
                data.created_at,
            );
            return new PorteroEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new PorteroEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_colegio,colegio,id_portero,nro_doc,nombre,paterno,materno,telefono,correo,estado,created_at} = object;   
                return new PorteroEntity(
                    id_colegio,
                    colegio,
                    id_portero,
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
            return new PorteroEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new PorteroEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}