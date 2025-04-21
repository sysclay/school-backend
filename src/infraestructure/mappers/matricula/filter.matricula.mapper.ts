import { CustomError, FilterMatriculaEntity, FilterMatriculaEntityOu, MatriculaEntity, MatriculaEntityOu } from "../../../domain/index.js";

export class FilterMatriculaMapper {

    static matriculaEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new FilterMatriculaEntity (
                data._id||data.id ,
                data.turno,
                data.fecha, 
                data.hora_entrada, 
                data.hora_salida, 
                data.tardanza, 
                data.nombre_institucion, 
                data.nivel, 
                data.grado, 
                data.seccion,
            );   
            return new FilterMatriculaEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new FilterMatriculaEntityOu(
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
            const _data = new FilterMatriculaEntity (
                data._id||data.id ,
                data.turno,
                data.fecha, 
                data.hora_entrada, 
                data.hora_salida, 
                data.tardanza, 
                data.nombre_institucion, 
                data.nivel, 
                data.grado, 
                data.seccion,
            );
            return new FilterMatriculaEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new FilterMatriculaEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, turno,fecha,hora_entrada,hora_salida,tardanza,nombre_institucion,nivel,grado,seccion} = object;
                return new FilterMatriculaEntity(
                    _id||id,
                    turno,
                    fecha, 
                    hora_entrada, 
                    hora_salida, 
                    tardanza, 
                    nombre_institucion, 
                    nivel, 
                    grado, 
                    seccion,
                )
            })

            return new FilterMatriculaEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new FilterMatriculaEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}