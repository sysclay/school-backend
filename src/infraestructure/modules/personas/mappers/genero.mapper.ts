import { CustomError, GeneroEntity, GeneroEntityOu } from "../../../../domain/index.js";

export class GeneroMapper {

    static generoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.nombre){ throw CustomError.badRequest('Missing nombre'); }
            // if(!data.apellido_paterno){ throw CustomError.badRequest('Missing apellido'); }
            const _data = new GeneroEntity (
                data.id_genero,
                data.nom_gen,
                data.nom_abr,
                data.estado,
            );   
            return new GeneroEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new GeneroEntityOu(
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
            const _data = new GeneroEntity (
                data.id_genero,
                data.nom_gen,
                data.nom_abr,
                data.estado,
            );
            return new GeneroEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new GeneroEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_genero,nom_gen,nom_abr,estado} = object;
                return new GeneroEntity(
                    id_genero,
                    nom_gen,
                    nom_abr,
                    estado,
                )
            })

            return new GeneroEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new GeneroEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}