import { CustomError, TurnoColegioEntity, TurnoColegioEntityOu } from "../../../../domain/index.js";

export class TurnoColegioMapper {

    static EntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.rol_id){ throw CustomError.badRequest('Missing Rol'); }
            const _data = new TurnoColegioEntity (
                data.id_turno_colegio,
                data.id_colegio,
                data.colegio,
                data.turno,
                data.hora_inicio,
                data.hora_fin,
                data.estado,
                data.created_at,
            );   
            return new TurnoColegioEntityOu(
                ok,
                _data, 
                message,
            );
        }else{
            return new TurnoColegioEntityOu(
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
            const _data = new TurnoColegioEntity (
                data.id_turno_colegio,
                data.id_colegio,
                data.colegio,
                data.turno,
                data.hora_inicio,
                data.hora_fin,
                data.estado,
                data.created_at,
            );
            return new TurnoColegioEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new TurnoColegioEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_turno_colegio,id_colegio,colegio,turno,hora_inicio,hora_fin,estado,created_at} = object;
                return new TurnoColegioEntity(
                    id_turno_colegio,
                    id_colegio,
                    colegio,
                    turno,
                    hora_inicio,
                    hora_fin,
                    estado,
                    created_at,
                )
            })

            return new TurnoColegioEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new TurnoColegioEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}