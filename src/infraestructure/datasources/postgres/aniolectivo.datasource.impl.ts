
import { CustomError, AniolectivoDatasource, AniolectivoEntityOu, RegisterAniolectivoDto } from "../../../domain/index.js";
import { AniolectivoMapper } from "../../mappers/aniolectivo.mapper.js";
//import { AniolectivoModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class AniolectivoDatasourceImpl implements AniolectivoDatasource { 

    async register(registerAniolectivoDto: RegisterAniolectivoDto): Promise<AniolectivoEntityOu>{
        const { anio, colegio_id } = registerAniolectivoDto;
        const pool = PostgresDatabase.getPool();
        try {
            
            const query = `INSERT INTO tbl_anio_lectivo (anio, colegio_id) VALUES ($1, $2) RETURNING *`;
            const values = [anio, colegio_id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return AniolectivoMapper.AniolectivoEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return AniolectivoMapper.AniolectivoEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                if (error.constraint === 'tbl_anio_lectivo_anio_colegio_id_key') {
                    throw CustomError.badRequest(`El colegio y año lectivo ya existe`);
                }
            }

            if (error.code === '23503') {
                if (error.constraint === 'tbl_anio_lectivo_colegio_id_fkey') {
                    throw CustomError.badRequest(`El colegio no existe`);
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

    async findAll():Promise<AniolectivoEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_anio_lectivo where estado = true");

            if(result){
                return AniolectivoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AniolectivoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}