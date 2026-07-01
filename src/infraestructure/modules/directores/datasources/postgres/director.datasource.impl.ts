import { CustomError, DirectorDatasource, DirectorEntityOu, RegisterDirectorDto } from "../../../../../domain/index.js";
import { DirectorMapper } from "../../mappers/director.mapper.js";

import { PostgresConnection } from "../../../../database/postgres/index.js";

export class DirectorDatasourceImpl implements DirectorDatasource { 

    async register(registerDirectorDto: RegisterDirectorDto): Promise<DirectorEntityOu>{
        const { id_persona, cip, formacion_academica } = registerDirectorDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `INSERT INTO tbl_Director (Director, grado_id ) VALUES ($1, $2 ) RETURNING *`;
            const values = [id_persona, cip, formacion_academica ];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return DirectorMapper.DirectorEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return DirectorMapper.DirectorEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            
            if (error.code === '23505') {
                if (error.constraint === 'tbl_Director_Director_grado_id_key') {
                    throw CustomError.badRequest(`El grado y Director ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_Director_grado_id_fkey') {
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

    async findById(id: string): Promise<DirectorEntityOu> {
        try {
            const pool = PostgresConnection.getPool();

            const result = await pool.query("SELECT * FROM v_list_colegio WHERE id_colegio = $1", [id]);
            if(result.rows.length>0){
                return DirectorMapper.DirectorEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }else {
                return DirectorMapper.DirectorEntityFromObject({ok:false, message:'No encontrado'});
            }
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<DirectorEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_directores AS response");

            if(result.rows){
                return DirectorMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return DirectorMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findByIdColegio(id:string):Promise<DirectorEntityOu>{
        try {
            const pool = PostgresConnection.getPool();

            const query = `SELECT * FROM v_list_directores WHERE id_colegio=$1 AND estado=true`;
            const values = [id];

            const result = await pool.query(query, values);
            if(result.rows.length>0){
                return DirectorMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return DirectorMapper.findEntityFromObject({ok:false,message:'Operación exitosa', data: []})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}