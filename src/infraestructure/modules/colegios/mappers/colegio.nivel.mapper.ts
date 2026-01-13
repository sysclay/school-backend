// import { ColegioNivelEntity, ColegioNivelEntityOu } from "../../../../domain/modulos/ColegioNivel/index.js";
// import { CustomError } from "../../../../domain/index.js";

import { ColegioNivelEntity, ColegioNivelEntityOu, CustomError } from "../../../../domain/index.js";


export class ColegioNivelMapper {

    static colegioNivelEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre_institucion){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.correo){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new ColegioNivelEntity (
                data.id_colegio,
                data.id_nivel,
                data.colegio,
                data.nivel,
                data.estado,
                data.cantidad_nivel,
                data.cantidad_grado,
            );   
            return new ColegioNivelEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new ColegioNivelEntityOu(
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
            const _data = new ColegioNivelEntity (
                data.id_colegio,
                data.id_nivel,
                data.colegio,
                data.nivel,
                data.estado,
                data.cantidad_nivel,
                data.cantidad_grado,
            );
            return new ColegioNivelEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new ColegioNivelEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_colegio,id_nivel,colegio,nivel,estado,cantidad_grado,cantidad_seccion} = object;   
                return new ColegioNivelEntity(
                    id_colegio,
                    id_nivel,
                    colegio,
                    nivel,
                    estado,
                    cantidad_grado,
                    cantidad_seccion,
                )
            })

            return new ColegioNivelEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new ColegioNivelEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}