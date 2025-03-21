
import { CustomError, DocenteDatasource, DocenteEntityOu, RegisterDocenteDto } from "../../../domain/index.js";
import { DocenteMapper } from "../../mappers/docente.mapper.js";
//import { DocenteModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class DocenteDatasourceImpl implements DocenteDatasource { 

    async register(registerDocenteDto: RegisterDocenteDto): Promise<DocenteEntityOu>{
        const { nombre, apellido_paterno, apellido_materno, nro_documento,tipo_documento_id} = registerDocenteDto;
        const pool = PostgresDatabase.getPool();

        try {
           
            const query = `INSERT INTO tbl_docente (nombre,apellido_paterno, apellido_materno,nro_documento,tipo_documento_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [nombre, apellido_paterno,apellido_materno, nro_documento, tipo_documento_id];
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return DocenteMapper.DocenteEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return DocenteMapper.DocenteEntityFromObject({ok:false,message:'Error'});

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

    async findById (id:string): Promise<DocenteEntityOu> {
        try {
            const pool = PostgresDatabase.getPool();
            const query = `SELECT * FROM tbl_docente WHERE id = $1`;
            const result = await pool.query(query, [id]);
            // console.log('ID::',result)
            if(result.rowCount===1){

                return DocenteMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return DocenteMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    //async findByNameCorto(nom_corto:string): Promise<DocenteEntityOu> {
    //    try {
    //        return DocenteMapper.findByNameCortoEntityFromObject({ok:true, data:'documento',message:'Operación //exitosa'});
    //    } catch (error) {
    //        if(error instanceof CustomError){
    //        throw error;
    //        }
    //        throw CustomError.internalServer();
    //    }
    //}

    async findAll():Promise<DocenteEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_docente where estado = true");
            //console.log('LISTA',result)
            if(result){
                return DocenteMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return DocenteMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}