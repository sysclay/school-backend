
import { CustomError, ApoderadoDatasource, ApoderadoEntityOu, RegisterApoderadoDto } from "../../../domain/index.js";
import { ApoderadoMapper } from "../../mappers/apoderado.mapper.js";
//import { ApoderadoModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class ApoderadoDatasourceImpl implements ApoderadoDatasource { 

    async register(registerApoderadoDto: RegisterApoderadoDto): Promise<ApoderadoEntityOu>{
        const { nombre, apellido_paterno, apellido_materno, nro_documento,tipo_documento_id} = registerApoderadoDto;
        const pool = PostgresDatabase.getPool();
        try {
           
            const query = `INSERT INTO tbl_apoderado (nombre,apellido_paterno, apellido_materno,nro_documento,tipo_documento_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [nombre, apellido_paterno,apellido_materno, nro_documento, tipo_documento_id];
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return ApoderadoMapper.ApoderadoEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return ApoderadoMapper.ApoderadoEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            // console.log(error)
            if (error.code === '23505') {
                throw CustomError.badRequest(`El numero documento ya existe`);
            }
            if (error.code === '23503') {
                throw CustomError.badRequest(`El tipo documento no existe`);
            }

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findById (id:string): Promise<ApoderadoEntityOu> {
        try {
            const pool = PostgresDatabase.getPool();
            const query = `SELECT * FROM tbl_apoderado WHERE id = $1`;
            const result = await pool.query(query, [id]);
            // console.log('ID::',result)
            if(result.rowCount===1){
                return ApoderadoMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return ApoderadoMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    //async findByNameCorto(nom_corto:string): Promise<ApoderadoEntityOu> {
    //    try {
    //        return ApoderadoMapper.findByNameCortoEntityFromObject({ok:true, data:'documento',message:'Operación //exitosa'});
    //    } catch (error) {
    //        if(error instanceof CustomError){
    //        throw error;
    //        }
    //        throw CustomError.internalServer();
    //    }
    //}

    async findAll():Promise<ApoderadoEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_apoderado where estado = true");
            //console.log('LISTA',result)
            if(result){
                return ApoderadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ApoderadoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}