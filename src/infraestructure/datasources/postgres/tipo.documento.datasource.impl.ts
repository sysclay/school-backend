
import { CustomError, TipoDocumentoDatasource, TipoDocumentoEntityOu, RegisterTipoDocumentoDto } from "../../../domain/index.js";
import { TipoDocumentoMapper } from "../../mappers/tipo.documento.mapper.js";
//import { TipoDocumentoModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class TipoDocumentoDatasourceImpl implements TipoDocumentoDatasource { 

    async register(registerTipoDocumentoDto: RegisterTipoDocumentoDto): Promise<TipoDocumentoEntityOu>{

        const { nom_largo, nom_corto, longitud} = registerTipoDocumentoDto;
        try {

            return TipoDocumentoMapper.tipoDocumentoEntityFromObject({ok:true, data:'',message:'Operación exitosa'});

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findById (id:string): Promise<TipoDocumentoEntityOu> {
        try {


            return TipoDocumentoMapper.findByIdEntityFromObject({ok:true, data:'documento',message:'Operación exitosa'});
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

     async findByNameCorto(nom_corto:string): Promise<TipoDocumentoEntityOu> {
         try {

             return TipoDocumentoMapper.findByNameCortoEntityFromObject({ok:true, data:'documento',message:'Operación exitosa'});
         } catch (error) {
             if(error instanceof CustomError){
                throw error;
             }
             throw CustomError.internalServer();
         }
     }

    async findAll():Promise<TipoDocumentoEntityOu>{
        try {
            console.log('Aqui')
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_tipo_documento where estado = true");
            if(result){
                return TipoDocumentoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return TipoDocumentoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            console.log('Aqui error',error)
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}