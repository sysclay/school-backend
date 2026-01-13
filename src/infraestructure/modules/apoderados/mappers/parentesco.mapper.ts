// import { ParentescoEntity, ParentescoEntityOu } from "../../../../domain/modulos/Parentesco/index.js";
// import { CustomError } from "../../../../domain/index.js";

import { ParentescoEntity, ParentescoEntityOu, CustomError } from "../../../../domain/index.js";


export class ParentescoMapper {

    static parentescoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new ParentescoEntity (
                data.id_parentesco,
                data.cod,
                data.parentesco,
                data.estado,
                data.created_at,
            );   
            return new ParentescoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new ParentescoEntityOu(
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
            const _data = new ParentescoEntity (
                data.id_parentesco,
                data.cod,
                data.parentesco,
                data.estado,
                data.created_at,
            );
            return new ParentescoEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new ParentescoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_parentesco,cod,parentesco,estado,created_at} = object;   
                return new ParentescoEntity(
                    id_parentesco,
                    cod,
                    parentesco,
                    estado,
                    created_at,
                )
            })
            return new ParentescoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new ParentescoEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}