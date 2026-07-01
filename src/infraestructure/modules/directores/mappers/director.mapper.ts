
import { DirectorEntity, DirectorEntityOu, CustomError } from "../../../../domain/index.js";

export class DirectorMapper {

    static DirectorEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new DirectorEntity (
                data.id_persona,
                data.id_colegio,
                data.id_rol,
                data.nro_documento,
                data.nombre_completo,
                data.correo,
                data.telefono,
                data.colegio,
                data.estado,
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
                data.id_persona,
                data.id_colegio,
                data.id_rol,
                data.nro_documento,
                data.nombre_completo,
                data.correo,
                data.telefono,
                data.colegio,
                data.estado,
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
                const {id_persona,id_colegio,id_rol,nro_documento,nombre_completo,correo,telefono,colegio,estado} = object;   
                return new DirectorEntity(
                    id_persona,
                    id_colegio,
                    id_rol,
                    nro_documento,
                    nombre_completo,
                    correo,
                    telefono,
                    colegio,
                    estado,
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