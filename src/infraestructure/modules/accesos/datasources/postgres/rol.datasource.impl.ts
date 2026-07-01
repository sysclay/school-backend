
import { CustomError,RolDatasource,RolEntityOu, RegisterRolDto } from "../../../../../domain/index.js";
import { RolMapper } from "../../mappers/rol.mapper.js";
//import {RolModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
// import { RolAsignadoMapper } from "../../mappers/rol.asignado.mapper.js";

export class RolDatasourceImpl implements RolDatasource { 

    async register(registerRolDto: RegisterRolDto, by:string): Promise<RolEntityOu>{
        const { codigo, nombre,descripcion} = registerRolDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `INSERT INTO tbl_roles (cod_rol, nom_rol, descripcion, created_by ) VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [codigo, nombre,descripcion, by];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return RolMapper.EntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return RolMapper.EntityFromObject({ok:false,message:'Error'});

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

            if (error.code === '22P02') {
                throw CustomError.badRequest(`La sintaxis no es valida`);
            }

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


    async findAll():Promise<RolEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_roles AS response");
  
            if(result){
                return RolMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return RolMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}