
import { CustomError, FcmDatasource, FcmEntityOu, FilterFcmDto, RegisterFcmDto, UpdateFcmDto } from "../../../domain/index.js";
import { FcmMapper } from "../../mappers/fcm.mapper.js";
//import { FcmModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class FcmDatasourceImpl implements FcmDatasource { 

    async register(registerFcmDto: RegisterFcmDto): Promise<FcmEntityOu>{
        const { usuario_id, token_fcm, device_id,authenticated } = registerFcmDto;
        const pool = PostgresDatabase.getPool();
        try {
            const query = `INSERT INTO tbl_fcm (usuario_id,token_fcm, device_id,authenticated) VALUES ($1, $2, $3, $4 ) RETURNING *`;
            const values = [ usuario_id, token_fcm, device_id,authenticated];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');

            if(result.rows.length>0){
                return FcmMapper.FcmEntityFromObject({ok:true,data:result.rows[0],message:'Operación exitosa'});
            }

            return FcmMapper.FcmEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                if (error.constraint === 'tbl_fcm_token_fcm_device_id_usuario_id_key') {
                    throw CustomError.badRequest(`El fcm ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_fcm_usuario_id_fkey') {
                    throw CustomError.badRequest(`El usuario no existe`);
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

            if(result){

                return FcmMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return FcmMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterAll(filterFcmDto: FilterFcmDto): Promise<FcmEntityOu> {
        try {
            const { token_fcm, device_id, usuario_id } = filterFcmDto;
            const pool = PostgresDatabase.getPool();

            const query = "SELECT * FROM tbl_fcm where estado = true and token_fcm=$1 and device_id=$2 and usuario_id=$3";
            const values = [token_fcm,device_id,usuario_id]

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rowCount!=0){
                return FcmMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }else{
                return FcmMapper.findEntityFromObject({ok:false,data:[],message:'Sin datos'})
            }
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateAll(id: string, updateFcmDto: UpdateFcmDto): Promise<FcmEntityOu> {
        try {
            const { authenticated, usuario_id } = updateFcmDto;
            const pool = PostgresDatabase.getPool();

            const query = "UPDATE tbl_fcm set authenticated = $1 WHERE id=$2 and usuario_id=$3";
            const values = [authenticated,id,usuario_id]

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rowCount!=0){
                return FcmMapper.findEntityFromObject({ok:true,message:'Se actualizo'})
            }else {
                return FcmMapper.findEntityFromObject({ok:false,message:'No se actualizo'})
            }

        } catch (error:any) {

            if (error.code === '22P02') {
                throw CustomError.badRequest(`La sintaxis no es valida`);
            }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


}