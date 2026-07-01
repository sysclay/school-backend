import { CustomError, TurnoEntity, TurnoEntityOu } from "../../../../domain/index.js";

export class TurnoMapper {

    static EntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.rol_id){ throw CustomError.badRequest('Missing Rol'); }
            const _data = new TurnoEntity (
                data.id_Turno,
                data.turno,
                data.descripcion,
                data.estado,
                data.created_at,
            );   
            return new TurnoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new TurnoEntityOu(
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
            const _data = new TurnoEntity (
                data.id_turno,
                data.turno,
                data.descripcion,
                data.estado,
                data.created_at,
            );
            return new TurnoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new TurnoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_turno,turno,descripcion,estado,created_at} = object;
                return new TurnoEntity(
                    id_turno,
                    turno,
                    descripcion,
                    estado,
                    created_at,
                )
            })

            return new TurnoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new TurnoEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}