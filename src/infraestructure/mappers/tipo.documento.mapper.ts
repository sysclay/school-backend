import { CustomError, TipoDocumentoEntity, TipoDocumentoEntityOu } from "../../domain/index.js";

export class TipoDocumentoMapper {

    static tipoDocumentoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            if(!data.nom_largo){ throw CustomError.badRequest('Missing nom_largo'); }
            if(!data.nom_corto){ throw CustomError.badRequest('Missing nom_corto'); }
            const _data = new TipoDocumentoEntity (
                data._id||data.id ,
                data.nom_largo,
                data.nom_corto, 
                data.longitud,
            );   
            return new TipoDocumentoEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new TipoDocumentoEntityOu(
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
            _data = new TipoDocumentoEntity (
                data._id||data.id ,
                data.nom_largo,
                data.nom_corto, 
                data.longitud,
            );            
        }

        return new TipoDocumentoEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findByNameCortoEntityFromObject(object:{ [key:string]:any}){
        const {ok,data,message} = object;
        var _data:any
        if(data){
            _data = new TipoDocumentoEntity (
                data._id||data.id ,
                data.nom_largo,
                data.nom_corto, 
                data.longitud,
            );            
        }
        return new TipoDocumentoEntityOu(
            ok,
            _data,
            message,
        );
    }

    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {_id,id, nom_largo,nom_corto, longitud} = object;
                return new TipoDocumentoEntity(
                    _id||id,
                    nom_largo,
                    nom_corto,
                    longitud
                )
            })

            return new TipoDocumentoEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new TipoDocumentoEntityOu(
                ok,
                data, 
                message,
            )
        }

    }
}