import { CustomError, PersonaEntity, PersonaEntityOu } from "../../../../domain/index.js";

export class PersonaMapper {

    static PersonaEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.apellido_paterno){ throw CustomError.badRequest('Missing apellido'); }
                    // Convertir foto a base64 si existe y no es null
            const _data = new PersonaEntity (
                // data._id||data.id ,
                data.id_persona,
                data.id_documento,
                data.nom_doc,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.direccion,
                data.id_genero,
                data.nom_gen,
                data.fecha_nacimiento,
                data.foto,
                data.estado,
                data.created_at,
                data.created_by,
            );   
            return new PersonaEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new PersonaEntityOu(
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
            // Convertir foto a base64 si existe y no es null
            const _data = new PersonaEntity (
                data.id_persona,
                data.id_documento,
                data.nom_doc,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.direccion,
                data.id_genero,
                data.nom_gen,
                data.fecha_nacimiento,
                data.foto,
                data.estado,
                data.created_at,
                data.created_by,
            );
            return new PersonaEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new PersonaEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_persona,id_documento,nom_doc,nro_doc,nombre,paterno,materno,telefono,correo,direccion,id_genero,nom_gen,fecha_nacimiento,foto,estado,created_at,created_by} = object;

                return new PersonaEntity(

                    id_persona,
                    id_documento,
                    nom_doc,
                    nro_doc,
                    nombre,
                    paterno,
                    materno,
                    telefono,
                    correo,
                    direccion,
                    id_genero,
                    nom_gen,
                    fecha_nacimiento,
                    foto,
                    estado,
                    created_at,
                    created_by,
                )
            })

            return new PersonaEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new PersonaEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}