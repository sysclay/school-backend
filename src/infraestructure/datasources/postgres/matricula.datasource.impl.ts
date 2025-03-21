
import { CustomError, MatriculaDatasource, MatriculaEntityOu, RegisterMatriculaDto } from "../../../domain/index.js";
import { MatriculaMapper } from "../../mappers/matricula.mapper.js";
//import { MatriculaModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { QR } from "../../../config/index.js";

export class MatriculaDatasourceImpl implements MatriculaDatasource { 

    async register(registerMatriculaDto: RegisterMatriculaDto): Promise<MatriculaEntityOu>{
        const { alumno_id, apoderado_id,seccion_id} = registerMatriculaDto;
        const pool = PostgresDatabase.getPool();
        try {
           
            const query = `INSERT INTO tbl_matricula (alumno_id,apoderado_id, seccion_id) VALUES ($1, $2, $3) RETURNING *`;
            const values = [alumno_id, apoderado_id,seccion_id];
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return MatriculaMapper.MatriculaEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return MatriculaMapper.MatriculaEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            console.log(error)
            if (error.code === '23505') {
                if (error.constraint === 'tbl_matricula_id_alumno_id_seccion_id_key') {
                    throw CustomError.badRequest(`Ya existe la matricula`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_matricula_apoderado_id_fkey') {
                    throw CustomError.badRequest(`El apoderado no existe`);
                }
                if (error.constraint === 'tbl_matricula_alumno_id_fkey') {
                    throw CustomError.badRequest(`El alumno no existe`);
                }
                if (error.constraint === 'tbl_matricula_seccion_id_fkey') {
                    throw CustomError.badRequest(`La seccion no existe`);
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

    async findById (id:string): Promise<MatriculaEntityOu> {
        try {
            const pool = PostgresDatabase.getPool();
            const query = `SELECT * FROM tbl_matricula WHERE id = $1`;
            const result = await pool.query(query, [id]);
            // console.log('ID::',result)
            if(result.rowCount===1){
                return MatriculaMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return MatriculaMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    //async findByNameCorto(nom_corto:string): Promise<MatriculaEntityOu> {
    //    try {
    //        return MatriculaMapper.findByNameCortoEntityFromObject({ok:true, data:'documento',message:'Operación //exitosa'});
    //    } catch (error) {
    //        if(error instanceof CustomError){
    //        throw error;
    //        }
    //        throw CustomError.internalServer();
    //    }
    //}

    async findAll():Promise<MatriculaEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_matricula where estado = true");
            console.log(result)
            if(result){
                return MatriculaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return MatriculaMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            console.log(error)

            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}