import { FilterApoderadoEntity, FilterApoderadoEntityOu } from "../../../domain/index.js";
// import { CustomError, ApoderadoEntity, ApoderadoEntityOu } from "../../domain/index.js";

export class FilterApoderadoMapper {

    static ApoderadoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new FilterApoderadoEntity (
                data.alumno_id,
                data.matricula_id,
                data.codigo_qr,
                data.turno,
                data.nro_documento,
                data.nombre,
                data.apellido_paterno,
                data.apellido_materno,
                data.telefono,
                data.grado,
                data.alias,
                data.descripcion,
                data.seccion,
                data.nivel,
                data.anio,
            );   
            return new FilterApoderadoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new FilterApoderadoEntityOu(
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
            const _data = new FilterApoderadoEntity (
                data.alumno_id,
                data.matricula_id,
                data.codigo_qr,
                data.turno,
                data.nro_documento,
                data.nombre,
                data.apellido_paterno,
                data.apellido_materno,
                data.telefono,
                data.grado,
                data.alias,
                data.descripcion,
                data.seccion,
                data.nivel,
                data.anio,
            );
            return new FilterApoderadoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new FilterApoderadoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {alumno_id,matricula_id,codigo_qr,turno,nro_documento,nombre,apellido_paterno,apellido_materno,nivel,telefono,grado,alias,descripcion,seccion,anio} = object;
                return new FilterApoderadoEntity(
                    // _id||id,
                    alumno_id,
                    matricula_id,
                    codigo_qr,
                    turno,
                    nro_documento,
                    nombre,
                    apellido_paterno,
                    apellido_materno,
                    telefono,
                    grado,
                    alias,
                    descripcion,
                    seccion,
                    nivel,
                    anio,

                )
            })

            return new FilterApoderadoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new FilterApoderadoEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}