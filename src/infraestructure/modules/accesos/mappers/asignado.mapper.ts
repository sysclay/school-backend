import { CustomError, AsignadoEntity, AsignadoEntityOu } from "../../../../domain/index.js";

export class AsignadoMapper {

    static EntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.rol_id){ throw CustomError.badRequest('Missing Rol'); }
            const _data = new AsignadoEntity (
                data.id_asigna,
                data.id_asignado,
                data.asigna,
                data.asignado,
                data.estado,
            );   
            return new AsignadoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new AsignadoEntityOu(
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
            const _data = new AsignadoEntity (
                data.id_asigna,
                data.id_asignado,
                data.asigna,
                data.asignado,
                data.estado,
            );
            return new AsignadoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new AsignadoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_asigna,id_asignado,asigna,asignado,estado} = object;
                return new AsignadoEntity(
                    id_asigna,
                    id_asignado,
                    asigna,
                    asignado,
                    estado,
                )
            })

            return new AsignadoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new AsignadoEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}