import { CustomError, GrupoEntity, GrupoEntityOu } from "../../../../domain/index.js";

export class GrupoMapper {

    static EntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.rol_id){ throw CustomError.badRequest('Missing Rol'); }
            const _data = new GrupoEntity (
                data.id_grupo,
                data.id_academico,
                data.id_colegio,
                data.id_nivel,
                data.id_grado,
                data.id_seccion,
                data.nombre,
                data.nivel,
                data.grado,
                data.seccion,
                data.capacidad,
                data.hora_inicio,
                data.hora_fin,
                data.turno,
                data.estado,
                data.created_at,
            );   
            return new GrupoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new GrupoEntityOu(
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
            const _data = new GrupoEntity (
                data.id_grupo,
                data.id_academico,
                data.id_colegio,
                data.id_nivel,
                data.id_grado,
                data.id_seccion,
                data.nombre,
                data.nivel,
                data.grado,
                data.seccion,
                data.capacidad,
                data.hora_inicio,
                data.hora_fin,
                data.turno,
                data.estado,
                data.created_at,
            );
            return new GrupoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new GrupoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_grupo,id_academico,id_colegio,id_nivel,id_grado,id_seccion,nombre,nivel,grado,seccion,capacidad,hora_inicio,hora_fin,turno,estado,created_at} = object;
                return new GrupoEntity(
                    id_grupo,
                    id_academico,
                    id_colegio,
                    id_nivel,
                    id_grado,
                    id_seccion,
                    nombre,
                    nivel,
                    grado,
                    seccion,
                    capacidad,
                    hora_inicio,
                    hora_fin,
                    turno,
                    estado,
                    created_at,
                )
            })

            return new GrupoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new GrupoEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}