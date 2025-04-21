import { CustomError, GradoEntity, GradoEntityOu } from "../../domain/index.js";

export class GradoMapper {

    static GradoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.grado){ throw CustomError.badRequest('Missing grado'); }
            const _data = new GradoEntity (
                data._id||data.id ,
                data.grado,
                data.anio_lectivo_id, 
                data.nivel_id, 
            );   
            return new GradoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new GradoEntityOu(
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
            const _data = new GradoEntity (
                data._id||data.id ,
                data.grado,
                data.anio_lectivo_id, 
                data.nivel_id, 
            );
            return new GradoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new GradoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, grado,anio_lectivo_id,nivel_id} = object;
                return new GradoEntity(
                    _id||id,
                    grado,
                    anio_lectivo_id, 
                    nivel_id, 
                )
            })

            return new GradoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new GradoEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}