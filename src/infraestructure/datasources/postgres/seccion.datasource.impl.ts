
import { CustomError, SeccionDatasource, SeccionEntityOu, RegisterSeccionDto } from "../../../domain/index.js";
import { SeccionMapper } from "../../mappers/seccion.mapper.js";
//import { SeccionModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class SeccionDatasourceImpl implements SeccionDatasource { 

    async register(registerSeccionDto: RegisterSeccionDto): Promise<SeccionEntityOu>{
        const { seccion, grado_id } = registerSeccionDto;
        const pool = PostgresDatabase.getPool();
        try {
            
            const query = `INSERT INTO tbl_seccion (seccion, grado_id ) VALUES ($1, $2 ) RETURNING *`;
            const values = [ seccion, grado_id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return SeccionMapper.SeccionEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return SeccionMapper.SeccionEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            
            if (error.code === '23505') {
                if (error.constraint === 'tbl_seccion_seccion_grado_id_key') {
                    throw CustomError.badRequest(`El grado y seccion ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_seccion_grado_id_fkey') {
                    throw CustomError.badRequest(`El grado no existe`);
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


    async findAll():Promise<SeccionEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_seccion where estado = true");

            if(result){
                return SeccionMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return SeccionMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}