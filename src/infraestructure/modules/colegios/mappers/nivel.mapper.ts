// import { CustomError, NivelEntity, NivelEntityOu } from "../../domain/index.js";
import { CustomError, NivelEntity, NivelEntityOu } from "../../../../domain/index.js";

export class NivelMapper {

    static nivelEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.Nivel){ throw CustomError.badRequest('Missing Nivel'); }
            const _data = new NivelEntity (
                data._id||data.id_nivel ,
                data.codigo, 
                data.nivel, 
                data.descripcion, 
                data.estado, 
                data.cantidad_grado
            );   
            return new NivelEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new NivelEntityOu(
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
            const _data = new NivelEntity (
                data._id||data.id_nivel,
                data.codigo, 
                data.nivel, 
                data.descripcion, 
                data.estado, 
                data.cantidad_grado
            );
            return new NivelEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new NivelEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id_nivel,codigo, nivel,descripcion,estado, cantidad_grado} = object;
                return new NivelEntity(
                    _id||id_nivel,
                     codigo, 
                     nivel, 
                    descripcion, 
                    estado, 
                    cantidad_grado
                )
            })

            return new NivelEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new NivelEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}