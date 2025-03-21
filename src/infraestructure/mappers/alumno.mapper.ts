import { CustomError, AlumnoEntity, AlumnoEntityOu } from "../../domain/index.js";

export class AlumnoMapper {

    static AlumnoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.nombre){ throw CustomError.badRequest('Missing nombre'); }
            if(!data.apellido_paterno){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new AlumnoEntity (
                data._id||data.id ,
                data.nombre,
                data.apellido_paterno, 
                data.apellido_materno, 
                data.nro_documento,
                //data.codigo_qr,
                data.tipo_documento_id,
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
        // console.log(_data, ok,data,message)
        if(data){
            const _data = new AlumnoEntity (
                data._id||data.id ,
                data.nombre,
                data.apellido_paterno, 
                data.apellido_materno, 
                data.nro_documento,
                //data.codigo_qr,
                data.tipo_documento_id,
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
                const {_id,id, nombre,apellido_paterno,apellido_materno, nro_documento,tipo_documento_id} = object;
                return new AlumnoEntity(
                    _id||id,
                    nombre,
                    apellido_paterno, 
                    apellido_materno, 
                    nro_documento,
                    //codigo_qr,
                    tipo_documento_id,
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