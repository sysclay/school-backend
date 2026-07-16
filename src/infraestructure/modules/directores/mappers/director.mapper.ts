
import { DirectorEntity, DirectorEntityOu, CustomError } from "../../../../domain/index.js";

export class DirectorMapper {

    static DirectorEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new DirectorEntity (
                data.id_colegio,
                data.colegio,
                data.id_director,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.estado,
                data.created_at,
            );   
            return new DirectorEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new DirectorEntityOu(
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
            const _data = new DirectorEntity (
                data.id_colegio,
                data.colegio,
                data.id_director,
                data.nro_doc,
                data.nombre,
                data.paterno,
                data.materno,
                data.telefono,
                data.correo,
                data.estado,
                data.created_at,
            );
            return new DirectorEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new DirectorEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_colegio,id_director,nro_doc,nombre,paterno,materno,correo,telefono,colegio,estado,created_at} = object;   
                return new DirectorEntity(
                    id_colegio,
                    colegio,
                    id_director,
                    nro_doc,
                    nombre,
                    paterno,
                    materno,
                    telefono,
                    correo,
                    estado,
                    created_at,
                )
            })

            return new DirectorEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new DirectorEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}