import { CustomError, PersonaEntity, PersonaEntityOu } from "../../domain/index.js";

export class PersonaMapper {

    static PersonaEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.nombre){ throw CustomError.badRequest('Missing nombre'); }
            if(!data.apellido_paterno){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new PersonaEntity (
                data._id||data.id ,
                data.nombre,
                data.apellido_paterno, 
                data.apellido_materno, 
                data.nro_documento,
                //data.codigo_qr,
                data.tipo_documento_id,
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
            const _data = new PersonaEntity (
                data._id||data.id ,
                data.nombre,
                data.apellido_paterno, 
                data.apellido_materno, 
                data.nro_documento,
                //data.codigo_qr,
                data.tipo_documento_id,
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
                const {_id,id, nombre,apellido_paterno,apellido_materno, nro_documento,tipo_documento_id} = object;
                return new PersonaEntity(
                    _id||id,
                    nombre,
                    apellido_paterno, 
                    apellido_materno, 
                    nro_documento,
                    //codigo_qr,
                    tipo_documento_id,
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