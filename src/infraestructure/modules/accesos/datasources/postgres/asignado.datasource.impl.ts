
import { CustomError,AsignadoDatasource,AsignadoEntityOu, RegisterAsignadoDto } from "../../../../../domain/index.js";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
import { AsignadoMapper } from "../../mappers/asignado.mapper.js";

export class AsignadoDatasourceImpl implements AsignadoDatasource { 


    async register(registerAsignadoDto: RegisterAsignadoDto, by: string): Promise<AsignadoEntityOu> {
        const { id_asigna,id_asignado} = registerAsignadoDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `SELECT insertar_rol_asignado (p_id_asigna:=$1, p_id_asignado:=$2, p_by:=$3 ) AS response`;
            const values = [ id_asigna,id_asignado,by];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return AsignadoMapper.EntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message 
                });
            }

            return AsignadoMapper.EntityFromObject({ok:false,message:'Error'});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<AsignadoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_roles_asignados AS response");

            if(result){
                return AsignadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AsignadoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findById(id: string): Promise<AsignadoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT 
                        id_asignado,
                        asignado
                        FROM v_list_roles_asignados
                        WHERE estado=true AND id_asigna=$1`;
            const values = [id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result){
                return AsignadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AsignadoMapper.findEntityFromObject({ok:false,message:'Error'})

            
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}