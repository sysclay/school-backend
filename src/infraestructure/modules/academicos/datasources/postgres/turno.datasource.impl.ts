
import { CustomError, RegisterTurnoDto, TurnoDatasource, TurnoEntityOu } from "../../../../../domain/index.js";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
import { TurnoMapper } from "../../mappers/turno.mapper.js";

export class TurnoDatasourceImpl implements TurnoDatasource { 


    async register(registerTurnoDto: RegisterTurnoDto, by: string): Promise<TurnoEntityOu> {
        const { nombre, descripcion} = registerTurnoDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `SELECT insertar_turno (p_turno:=$1, p_desc:=$2 ) AS response`;
            const values = [ nombre,descripcion];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return TurnoMapper.EntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message 
                });
            }

            return TurnoMapper.EntityFromObject({ok:false,message:'Error'});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<TurnoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_turnos AS response");

            if(result){
                return TurnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return TurnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive():Promise<TurnoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_turnos WHERE estado=true ");

            if(result){
                return TurnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return TurnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findById(id: string): Promise<TurnoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT * FROM v_list_turnos WHERE id_turno=$1 AND estado=true `;
            const values = [id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return TurnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return TurnoMapper.findEntityFromObject({ok:false,message:'Sin datos', data:[]})
            
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}