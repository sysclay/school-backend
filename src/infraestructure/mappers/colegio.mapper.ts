import { CustomError, ColegioEntity, ColegioEntityOu } from "../../domain/index.js";

export class ColegioMapper {

    static ColegioEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.nombre_institucion){ throw CustomError.badRequest('Missing nombre'); }
            if(!data.correo){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new ColegioEntity (
                data._id||data.id ,
                data.nombre_institucion,
                data.correo, 
                data.telefono,
            );   
            return new ColegioEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new ColegioEntityOu(
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
            const _data = new ColegioEntity (
                data._id||data.id ,
                data.nombre_institucion,
                data.correo, 
                data.telefono,
            );
            return new ColegioEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new ColegioEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, nombre_institucion,correo, telefono} = object;
                return new ColegioEntity(
                    _id||id,
                    nombre_institucion,
                    correo, 
                    telefono,
                )
            })

            return new ColegioEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new ColegioEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}