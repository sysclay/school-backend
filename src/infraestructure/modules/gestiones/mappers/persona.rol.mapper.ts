
import { PersonaRolEntity, PersonaRolEntityOu, CustomError } from "../../../../domain/index.js";

export class PersonaRolMapper {

    static PersonaRolEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message,total,page,limit} = object;
        if(data!==undefined){
            const _data = new PersonaRolEntity (
                data.id_persona,
                data.tipo_documento,
                data.nro_documento,
                data.nombre,
                data.paterno,
                data.materno,
                data.foto,
                data.estado,
                data.roles,
            );   
            
            // Calculate total pages if pagination data is provided
            const totalPages = total && limit ? Math.ceil(total / limit) : undefined;
            
            return new PersonaRolEntityOu(
                ok,
                _data, 
                message,
                total,
                page,
                limit,
                totalPages,
            );            
        }else{
            return new PersonaRolEntityOu(
                ok,
                data, 
                message,
                total,
                page,
                limit,
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message,total,page,limit} = object;
        var _data:any

        if(data){
            const _data = new PersonaRolEntity (
                data.id_persona,
                data.tipo_documento,
                data.nro_documento,
                data.nombre,
                data.paterno,
                data.materno,
                data.foto,
                data.estado,
                data.roles,
            );
            
            // Calculate total pages if pagination data is provided
            const totalPages = total && limit ? Math.ceil(total / limit) : undefined;
            
            return new PersonaRolEntityOu(
                ok,
                _data,
                message,
                total,
                page,
                limit,
                totalPages,
            );
        }

        return new PersonaRolEntityOu(
            ok,
            _data,
            message,
            total,
            page,
            limit,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message,total,page,limit} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_persona,tipo_documento, nro_documento,nombre,paterno, materno,foto, roles,estado} = object;   
                return new PersonaRolEntity(
                    id_persona,
                    tipo_documento,
                    nro_documento,
                    nombre,
                    paterno,
                    materno,
                    foto,
                    estado,
                    roles,
                )
            })

            // Calculate total pages if pagination data is provided
            const totalPages = total && limit ? Math.ceil(total / limit) : undefined;

            return new PersonaRolEntityOu(
                ok,
                _data, 
                message,
                total,
                page,
                limit,
                totalPages,
            )
        }else{
            return new PersonaRolEntityOu(
                ok,
                data, 
                message,
                total,
                page,
                limit,
            )
        }

    }
}