// import { ColegioSeccionEntity, ColegioSeccionEntityOu } from "../../../../domain/modulos/ColegioSeccion/index.js";
// import { CustomError } from "../../../../domain/index.js";

import { ColegioSeccionEntity, ColegioSeccionEntityOu, CustomError } from "../../../../domain/index.js";


export class ColegioSeccionMapper {

    static colegioSeccionEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre_institucion){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.correo){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new ColegioSeccionEntity (
                data.id_colegio,
                data.id_nivel,
                data.id_grado,
                data.id_seccion,
                data.colegio,
                data.nivel,
                data.grado,
                data.seccion,
                data.descripcion,
                data.estado,
            );   
            return new ColegioSeccionEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new ColegioSeccionEntityOu(
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
            const _data = new ColegioSeccionEntity (
                data.id_colegio,
                data.id_nivel,
                data.id_grado,
                data.id_seccion,
                data.colegio,
                data.nivel,
                data.grado,
                data.seccion,
                data.descripcion,
                data.estado,
            );
            return new ColegioSeccionEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new ColegioSeccionEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_colegio,id_nivel,id_grado,id_seccion,colegio,nivel,grado,seccion,descripcion,estado,} = object;   
                return new ColegioSeccionEntity(
                    id_colegio,
                    id_nivel,
                    id_grado,
                    id_seccion,
                    colegio,
                    nivel,
                    grado,
                    seccion,
                    descripcion,
                    estado,
                )
            })

            return new ColegioSeccionEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new ColegioSeccionEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}