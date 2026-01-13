// import { CustomError, GradoEntity, GradoEntityOu } from "../../../../../domain/index.js";

import { CustomError, GradoEntity, GradoEntityOu } from "../../../../domain/index.js";

export class GradoMapper {

    static gradoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new GradoEntity (
                data.id_nivel,
                data.id_grado,
                data.nivel,
                data.codigo,
                data.grado,
                data.abreviado,
                data.descripcion,
                data.estado,
                data.cantidad_seccion
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
                data.id_nivel,
                data.id_grado,
                data.nivel,
                data.codigo,
                data.grado,
                data.abreviado,
                data.descripcion,
                data.estado,
                data.cantidad_seccion,
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
                const {id_nivel,id_grado,nivel,codigo, grado,abreviado,descripcion,estado,cantidad_seccion} = object;
                return new GradoEntity(
                    id_nivel,
                    id_grado,
                    nivel,
                    codigo,
                    grado,
                    abreviado,
                    descripcion,
                    estado,
                    cantidad_seccion,
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