import { CustomError, MatriculaEntity, MatriculaEntityOu } from "../../../domain/index.js";

export class MatriculaMapper {

    static matriculaEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.alumno_id){ throw CustomError.badRequest('Missing nombre'); }
            const _data = new MatriculaEntity (
                data._id||data.id ,
                data.alumno_id,
                data.apoderado_id, 
                data.seccion_id, 
            );   
            return new MatriculaEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new MatriculaEntityOu(
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
            const _data = new MatriculaEntity (
                data._id||data.id ,
                data.alumno_id,
                data.apoderado_id, 
                data.seccion_id, 
            );
            return new MatriculaEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new MatriculaEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, alumno_id,apoderado_id,seccion_id} = object;
                return new MatriculaEntity(
                    _id||id,
                    alumno_id,
                    apoderado_id, 
                    seccion_id, 
                )
            })

            return new MatriculaEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new MatriculaEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}