import { CustomError, DocenteEntity, DocenteEntityOu } from "../../domain/index.js";

export class DocenteMapper {

    static DocenteEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.nombre){ throw CustomError.badRequest('Missing nombre'); }
            if(!data.apellido_paterno){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new DocenteEntity (
                data._id||data.id ,
                data.nombre,
                data.apellido_paterno, 
                data.apellido_materno, 
                data.nro_documento,
                data.tipo_documento_id,
            );   
            return new DocenteEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new DocenteEntityOu(
                ok,
                data, 
                message,
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message} = object;
        var _data:any
        // console.log(_data, ok,data,message)
        if(data){
            const _data = new DocenteEntity (
                data._id||data.id ,
                data.nombre,
                data.apellido_paterno, 
                data.apellido_materno, 
                data.nro_documento,
                data.tipo_documento_id,
            );
            return new DocenteEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new DocenteEntityOu(
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
                return new DocenteEntity(
                    _id||id,
                    nombre,
                    apellido_paterno, 
                    apellido_materno, 
                    nro_documento,
                    tipo_documento_id,
                )
            })

            return new DocenteEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new DocenteEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}