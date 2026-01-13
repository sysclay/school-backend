import { CustomError, TipoDocumentoEntity, TipoDocumentoEntityOu } from "../../../../domain/index.js";

export class TipoDocumentoMapper {

    static tipoDocumentoEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            const _data = new TipoDocumentoEntity (
                // data._id||data.id ,
                data.id_documento,
                data.nom_doc,
                data.nom_abr, 
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
                // data._id||data.id ,
                data.id_documento,
                data.nom_doc,
                data.nom_abr, 
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
                // data._id||data.id ,
                data.id_documento,
                data.nom_doc,
                data.nom_abr, 
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
                const {id_documento, nom_doc,nom_abr, longitud} = object;
                return new TipoDocumentoEntity(
                    // _id||id,
                    id_documento,
                    nom_doc,
                    nom_abr,
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