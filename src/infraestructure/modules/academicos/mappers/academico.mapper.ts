import { CustomError, AcademicoEntity, AcademicoEntityOu } from "../../../../domain/index.js";

export class AcademicoMapper {

    static EntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.rol_id){ throw CustomError.badRequest('Missing Rol'); }
            const _data = new AcademicoEntity (
                data.id_academico,
                data.nombre,
                data.descripcion,
                data.estado,
                data.created_at,
            );   
            return new AcademicoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new AcademicoEntityOu(
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
            const _data = new AcademicoEntity (
                data.id_academico,
                data.nombre,
                data.descripcion,
                data.estado,
                data.created_at,
            );
            return new AcademicoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new AcademicoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_academico,nombre,descripcion,estado,created_at} = object;
                return new AcademicoEntity(
                    id_academico,
                    nombre,
                    descripcion,
                    estado,
                    created_at,
                )
            })

            return new AcademicoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new AcademicoEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}