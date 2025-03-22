
import { CustomError, FcmDatasource, FcmEntityOu, RegisterFcmDto } from "../../../domain/index.js";
import { FcmMapper } from "../../mappers/fcm.mapper.js";
//import { FcmModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class FcmDatasourceImpl implements FcmDatasource { 

    async register(registerFcmDto: RegisterFcmDto): Promise<FcmEntityOu>{
        const { token_fcm, apoderado_id } = registerFcmDto;
        const pool = PostgresDatabase.getPool();
        try {
            
            const query = `INSERT INTO tbl_fcm (token_fcm, apoderado_id ) VALUES ($1, $2 ) RETURNING *`;
            const values = [ token_fcm, apoderado_id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return FcmMapper.FcmEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return FcmMapper.FcmEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            console.log(error)
            if (error.code === '23505') {
                if (error.constraint === 'tbl_fcm_token_fcm_key') {
                    throw CustomError.badRequest(`El token ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_fcm_apoderado_id_fkey') {
                    throw CustomError.badRequest(`El apoderado no existe`);
                }
            }

            if (error.code === '22P02') {
                throw CustomError.badRequest(`La sintaxis no es valida`);
            }

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


    async findAll():Promise<FcmEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_fcm where estado = true");
            //console.log('LISTA',result)
            if(result){
                return FcmMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return FcmMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}