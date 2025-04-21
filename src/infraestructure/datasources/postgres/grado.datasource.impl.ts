
import { CustomError, GradoDatasource, GradoEntityOu, RegisterGradoDto } from "../../../domain/index.js";
import { GradoMapper } from "../../mappers/grado.mapper.js";
//import { GradoModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class GradoDatasourceImpl implements GradoDatasource { 

    async register(registerGradoDto: RegisterGradoDto): Promise<GradoEntityOu>{
        const { grado,grado_alias,grado_desc, anio_lectivo_id, nivel_id } = registerGradoDto;
        const pool = PostgresDatabase.getPool();
        try {
            
            const query = `INSERT INTO tbl_grado (grado,grado_alias,grado_desc, anio_lectivo_id, nivel_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [ grado,grado_alias,grado_desc, anio_lectivo_id, nivel_id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return GradoMapper.GradoEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return GradoMapper.GradoEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                if (error.constraint === 'tbl_grado_grado_nivel_id_anio_lectivo_id_key') {
                    throw CustomError.badRequest(`El nivel, grado y año lectivo ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_grado_anio_lectivo_id_fkey') {
                    throw CustomError.badRequest(`El año lectivo no existe`);
                }
                if (error.constraint === 'tbl_grado_nivel_id_fkey') {
                    throw CustomError.badRequest(`El nivel no existe`);
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


    async findAll():Promise<GradoEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_grado where estado = true");
   
            if(result){
                return GradoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return GradoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}