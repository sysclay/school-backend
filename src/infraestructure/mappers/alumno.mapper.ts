import { CustomError, AlumnoEntity, AlumnoEntityOu } from "../../domain/index.js";

export class AlumnoMapper {

    static AlumnoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new AlumnoEntity (
                data._id||data.id ,
                data.codigo_id,
                data.doc_tipo,
                data.nro_documento,
                data.nombre,
                data.apellido_paterno,
                data.apellido_materno,
                data.correo,
                data.telefono,
                data.estado,
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

        if(data){
            const _data = new AlumnoEntity (
                data._id||data.id ,
                data.codigo_id,
                data.doc_tipo,
                data.nro_documento,
                data.nombre,
                data.apellido_paterno,
                data.apellido_materno,
                data.correo,
                data.telefono,
                data.estado,
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
                const {_id,id, codigo_id,doc_tipo,nro_documento,nombre,apellido_paterno,apellido_materno,correo,telefono,estado} = object;
                return new AlumnoEntity(
                    _id||id,
                    codigo_id,
                    doc_tipo,
                    nro_documento,
                    nombre,
                    apellido_paterno,
                    apellido_materno,
                    correo,
                    telefono,
                    estado,
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