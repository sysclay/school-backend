
import { CustomError, RegisterTurnoColegioDto, TurnoColegioDatasource, TurnoColegioEntityOu } from "../../../../../domain/index.js";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
import { TurnoColegioMapper } from "../../mappers/turno.colegio.mapper.js";

export class TurnoColegioDatasourceImpl implements TurnoColegioDatasource { 


    async register(registerTurnoColegioDto: RegisterTurnoColegioDto, by: string): Promise<TurnoColegioEntityOu> {
        const { id_colegio, id_turno, hora_ini, hora_fin} = registerTurnoColegioDto;
        const pool = PostgresConnection.getPool();
        try {
            const query = `SELECT insertar_turno_colegio (p_id_turno:=$1,p_id_colegio:=$2,  p_h_ini:=$3, p_h_fin:=$4, p_by:=$5 ) AS response`;
            const values = [ id_turno,id_colegio, hora_ini, hora_fin,by];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return TurnoColegioMapper.EntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message 
                });
            }

            return TurnoColegioMapper.EntityFromObject({ok:false,message:'Error'});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<TurnoColegioEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_turnos_colegios AS response");

            if(result){
                return TurnoColegioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return TurnoColegioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive():Promise<TurnoColegioEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_turnos_colegios WHERE estado=true ");

            if(result){
                return TurnoColegioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return TurnoColegioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findColegio(id: string, activo:boolean): Promise<TurnoColegioEntityOu> {
        try {

            const pool = PostgresConnection.getPool();
            let query = 'SELECT * FROM v_list_turnos_colegios WHERE id_colegio = $1';
            const values: any[] = [id];
            if (activo) {
                query += ' AND estado = $2';
                values.push(true);
            }
            
            const result = await pool.query(query, values);

            if(result.rows.length>0){
                return TurnoColegioMapper.findEntityFromObject({
                    ok:true,
                    data:result.rows,
                    message:'Operación exitosa'});
            }

            return TurnoColegioMapper.findEntityFromObject({ok:false,message:'Error'});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findById(id: string): Promise<TurnoColegioEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT * FROM v_list_turnos_colegios WHERE id_colegio=$1 `;
            const values = [id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values);
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return TurnoColegioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return TurnoColegioMapper.findEntityFromObject({ok:false,message:'Sin datos', data:[]})
            
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


    async update(id: string, activo: boolean, by: string): Promise<TurnoColegioEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT * FROM update_turno_colegio(p_id_tur_col:=$1, p_est:=$2, p_by:=$3 ) AS response `;
            const values = [id,activo,by];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values);
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return TurnoColegioMapper.findEntityFromObject({ok:true, data:result.rows,message:result.rows[0].response.message})
            }
            return TurnoColegioMapper.findEntityFromObject({ok:false,message:'Sin datos', data:[]})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}