import { CustomError, AniolectivoEntity, AniolectivoEntityOu } from "../../domain/index.js";

export class AniolectivoMapper {

    static AniolectivoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.anio){ throw CustomError.badRequest('Missing nombre'); }
            if(!data.colegio_id){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new AniolectivoEntity (
                data._id||data.id ,
                data.anio,
                data.colegio_id, 
            );   
            return new AniolectivoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new AniolectivoEntityOu(
                ok,
                data, 
                message,
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message} = object;
        var _data:any
        // console.log(_data, ok,data,message)
        if(data){
            const _data = new AniolectivoEntity (
                data._id||data.id ,
                data.anio,
                data.colegio_id, 
            );
            return new AniolectivoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new AniolectivoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, anio,colegio_id} = object;
                return new AniolectivoEntity(
                    _id||id,
                    anio,
                    colegio_id, 
                )
            })

            return new AniolectivoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new AniolectivoEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}