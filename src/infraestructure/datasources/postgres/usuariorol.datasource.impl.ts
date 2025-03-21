
import { CustomError, UsuariorolDatasource, UsuariorolEntityOu, RegisterUsuariorolDto } from "../../../domain/index.js";
import { UsuariorolMapper } from "../../mappers/usuariorol.mapper.js";
//import { UsuariorolModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class UsuariorolDatasourceImpl implements UsuariorolDatasource { 

    async register(registerUsuariorolDto: RegisterUsuariorolDto): Promise<UsuariorolEntityOu>{
        const { rol_id,usuario_id} = registerUsuariorolDto;
        const pool = PostgresDatabase.getPool();
        try {
            
            const query = `INSERT INTO tbl_rol_usuario (rol_id, usuario_id ) VALUES ($1, $2) RETURNING *`;
            const values = [rol_id,usuario_id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return UsuariorolMapper.UsuariorolEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return UsuariorolMapper.UsuariorolEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            
            if (error.code === '23505') {
                if (error.constraint === 'tbl_rol_usuario_pkey') {
                    throw CustomError.badRequest(`El rol y usuario ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_rol_usuario_usuario_id_fkey') {
                    throw CustomError.badRequest(`El usuario no existe`);
                }

                if (error.constraint === 'tbl_rol_usuario_rol_id_fkey') {
                    throw CustomError.badRequest(`El rol no existe`);
                }
            }

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


    async findAll():Promise<UsuariorolEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_Usuariorol where estado = true");
            //console.log('LISTA',result)
            if(result){
                return UsuariorolMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return UsuariorolMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}