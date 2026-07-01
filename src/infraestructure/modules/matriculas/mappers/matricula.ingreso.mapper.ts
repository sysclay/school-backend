
import { MatriculaIngresoEntity, MatriculaIngresoEntityOu, CustomError } from "../../../../domain/index.js";

export class MatriculaIngresoMapper {

    static MatriculaIngresoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new MatriculaIngresoEntity (
                data.id_matricula_ingreso,
                data.nombre,
                data.descripcion,
                data.estado,
            );   
  
            return new MatriculaIngresoEntityOu(
                ok,
                _data, 
                message
            );            
        }else{
            return new MatriculaIngresoEntityOu(
                ok,
                data, 
                message
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message} = object;
        var _data:any

        if(data){
            const _data = new MatriculaIngresoEntity (
                data.id_matricula_ingreso,
                data.nombre,
                data.descripcion,
                data.estado,
            );
            
            return new MatriculaIngresoEntityOu(
                ok,
                _data,
                message
            );
        }

        return new MatriculaIngresoEntityOu(
            ok,
            _data,
            message
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_matricula_ingreso,nombre, descripcion,estado} = object;   
                return new MatriculaIngresoEntity(
                    id_matricula_ingreso,
                    nombre,
                    descripcion,
                    estado,
                )
            })
            return new MatriculaIngresoEntityOu(
                ok,
                _data, 
                message
            )
        }else{
            return new MatriculaIngresoEntityOu(
                ok,
                data, 
                message
            )
        }

    }
}