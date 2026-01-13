
import { MatriculaEstadoEntity, MatriculaEstadoEntityOu, CustomError } from "../../../../domain/index.js";

export class MatriculaEstadoMapper {

    static MatriculaEstadoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new MatriculaEstadoEntity (
                data.id_matricula_estado,
                data.nombre,
                data.descripcion,
                data.estado,
            );
            return new MatriculaEstadoEntityOu(
                ok,
                _data, 
                message
            );            
        }else{
            return new MatriculaEstadoEntityOu(
                ok,
                data, 
                message
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message,total,page,limit} = object;
        var _data:any

        if(data){
            const _data = new MatriculaEstadoEntity (
                data.id_matricula_estado,
                data.nombre,
                data.descripcion,
                data.estado,
            );
            return new MatriculaEstadoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new MatriculaEstadoEntityOu(
            ok,
            _data,
            message,
        );
    }

    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message,total,page,limit} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_matricula_estado,nombre, descripcion, estado} = object;   
                return new MatriculaEstadoEntity(
                    id_matricula_estado,
                    nombre,
                    descripcion,
                    estado,
                )
            })
            return new MatriculaEstadoEntityOu(
                ok,
                _data, 
                message
            )
        }else{
            return new MatriculaEstadoEntityOu(
                ok,
                data, 
                message
            )
        }
    }
}