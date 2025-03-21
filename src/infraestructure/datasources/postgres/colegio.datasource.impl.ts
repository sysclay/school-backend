
import { CustomError, ColegioDatasource, ColegioEntityOu, RegisterColegioDto } from "../../../domain/index.js";
import { ColegioMapper } from "../../mappers/colegio.mapper.js";
//import { ColegioModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class ColegioDatasourceImpl implements ColegioDatasource { 

    async register(registerColegioDto: RegisterColegioDto): Promise<ColegioEntityOu>{
        const { nombre_institucion, correo, telefono} = registerColegioDto;
        const pool = PostgresDatabase.getPool();
        try {
            
            const query = `INSERT INTO tbl_Colegio (nombre_institucion, correo, telefono) VALUES ($1, $2, $3) RETURNING *`;
            const values = [nombre_institucion, correo, telefono];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return ColegioMapper.ColegioEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return ColegioMapper.ColegioEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                if (error.constraint === 'tbl_colegio_correo_key') {
                    throw CustomError.badRequest(`El correo ya existe`);
                }
                if (error.constraint === 'tbl_colegio_telefono_key') {
                    throw CustomError.badRequest(`El telefono ya existe`);
                }
            }
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


    async findAll():Promise<ColegioEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_colegio where estado = true");
            //console.log('LISTA',result)
            if(result){
                return ColegioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ColegioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}