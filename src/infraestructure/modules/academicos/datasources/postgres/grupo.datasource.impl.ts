
import { CustomError, GrupoDatasource, GrupoEntityOu, RegisterGrupoDto } from "../../../../../domain/index.js";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
import { GrupoMapper } from "../../mappers/grupo.mapper.js";

export class GrupoDatasourceImpl implements GrupoDatasource { 


    async register(registerGrupoDto: RegisterGrupoDto, by: string): Promise<GrupoEntityOu> {
        const { nombre,capacidad,id_colegio,id_nivel,id_grado,id_seccion,id_academico,id_turno} = registerGrupoDto;
        const pool = PostgresConnection.getPool();

        try {
            const query = `SELECT insertar_grupo_academico(p_nom:=$1,p_cap:=$2,p_id_col:=$3, p_id_niv:=$4,p_id_gra:=$5,p_id_sec:=$6,p_id_tur:=$7,p_id_aca:=$8,p_by:=$9 ) AS response`;
            const values = [ nombre,capacidad,id_colegio,id_nivel,id_grado,id_seccion,id_turno,id_academico,by];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return GrupoMapper.EntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message 
                });
            }

            return GrupoMapper.EntityFromObject({ok:false,message:'Error'});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<GrupoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_grupos_academicos AS response");

            if(result){
                return GrupoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return GrupoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive():Promise<GrupoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_grupos_academicos AS response WHERE estado=true ");

            if(result){
                return GrupoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return GrupoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findById(id: string): Promise<GrupoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT * FROM v_list_grupos_academicos WHERE id_academico=$1 AND estado=true ORDER BY nivel, grado, seccion`;
            const values = [id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return GrupoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return GrupoMapper.findEntityFromObject({ok:false,message:'Sin datos', data:[]})
            
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}