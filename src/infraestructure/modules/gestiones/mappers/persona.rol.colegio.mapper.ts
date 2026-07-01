
import { PersonaRolColegioEntity, PersonaRolColegioEntityOu, CustomError } from "../../../../domain/index.js";

export class PersonaRolColegioMapper {

    static PersonaRolColegioEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message,total,page,limit} = object;
        if(data!==undefined){
            const _data = new PersonaRolColegioEntity (
                data.id_persona,
                data.nombre_completo,
                data.correo,
                data.foto,
                data.colegios,
            );   
            
            // Calculate total pages if pagination data is provided
            const totalPages = total && limit ? Math.ceil(total / limit) : undefined;
            
            return new PersonaRolColegioEntityOu(
                ok,
                _data, 
                message,
                total,
                page,
                limit,
                totalPages,
            );            
        }else{
            return new PersonaRolColegioEntityOu(
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
            const _data = new PersonaRolColegioEntity (
                data.id_persona,
                data.nombre_completo,
                data.correo,
                data.foto,
                data.colegios,
            );
            
            // Calculate total pages if pagination data is provided
            const totalPages = total && limit ? Math.ceil(total / limit) : undefined;
            
            return new PersonaRolColegioEntityOu(
                ok,
                _data,
                message,
                total,
                page,
                limit,
                totalPages,
            );
        }

        return new PersonaRolColegioEntityOu(
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
                const {id_persona,nombre_completo, correo, foto, colegios} = object;   
                return new PersonaRolColegioEntity(
                    id_persona,
                    nombre_completo,
                    correo,
                    foto,
                    colegios,
                )
            })

            // Calculate total pages if pagination data is provided
            const totalPages = total && limit ? Math.ceil(total / limit) : undefined;

            return new PersonaRolColegioEntityOu(
                ok,
                _data, 
                message,
                total,
                page,
                limit,
                totalPages,
            )
        }else{
            return new PersonaRolColegioEntityOu(
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