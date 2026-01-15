// import { AsistenciaProgramadoDatasource, AsistenciaProgramadoEntityOu, RegisterAsistenciaProgramadoDto } from "../../../../../domain/modulos/asistenciaprogramado/index.js";
import { CustomError, AsistenciaProgramadoDatasource, AsistenciaProgramadoEntityOu, RegisterAsistenciaProgramadoDto, FilterAsistenciaProgramadoDto  } from "../../../../../domain/index.js";
import { PostgresConnection } from "../../../../database/index.js";

import { AsistenciaProgramadoMapper } from "../../mappers/asistencia.programado.mapper.js";
// import { PostgresDatabase } from "../../../../../data/postgres/index.js";

export class AsistenciaProgramadoDatasourceImpl implements AsistenciaProgramadoDatasource { 

    async register(registerAsistenciaProgramadoDto: RegisterAsistenciaProgramadoDto,by:string): Promise<AsistenciaProgramadoEntityOu>{
        const { id_grupo_academico, fecha, dia_semana,hora_inicio,hora_fin,desc } = registerAsistenciaProgramadoDto;
        const pool = PostgresConnection.getPool();
        try {
            const fields = [
                { key: 'p_id_gru', value: id_grupo_academico},
                { key: 'p_fec', value: fecha},
                { key: 'p_week', value: dia_semana},
                { key: 'p_h_ini', value: hora_inicio},
                { key: 'p_h_fin', value: hora_fin},
                { key: 'p_des', value: desc},
                { key: 'p_by', value: by }
            ];

            // Filtrar solo los campos que no son null ni undefined
            const filteredFields = fields.filter(f => f.value !== undefined && f.value !== null && f.value !== '');
            const paramPlaceholders = filteredFields.map((_, idx) => `$${idx + 1}`);
            const paramNames = filteredFields.map(f => `${f.key}:=${paramPlaceholders.shift()}`).join(', ');
            const values = filteredFields.map(f => f.value);


            await pool.query('BEGIN');
            const query = `SELECT insertar_asistencia_programado(${paramNames}) AS response`;

            const result = await pool.query(query, values);
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return AsistenciaProgramadoMapper.asistenciaprogramadoEntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message, 
                    data:result.rows[0].response.data
                });
            }

            return AsistenciaProgramadoMapper.asistenciaprogramadoEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    // async findById(id:string):Promise<AsistenciaProgramadoEntityOu>{
    //     try {
    //         const pool = PostgresConnection.getPool();
    //         // const numericId = Number(id);
    //         // if (isNaN(numericId)) {
    //         //     return AsistenciaProgramadoMapper.asistenciaprogramadoEntityFromObject({ok:false,message:'No encontrado'});
    //         // }

    //         const result = await pool.query("SELECT * FROM v_list_asistenciaprogramado WHERE id_asistenciaprogramado = $1", [id]);
    //         if(result.rows.length>0){
    //             return AsistenciaProgramadoMapper.asistenciaprogramadoEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
    //         }else {
    //             return AsistenciaProgramadoMapper.asistenciaprogramadoEntityFromObject({ok:false, message:'No encontrado'});
    //         }
    //     } catch (error) {
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }

    async findAll(page:number, limit:number):Promise<AsistenciaProgramadoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const result = await pool.query("SELECT * FROM v_list_asistencia_programado AS response");

            if(result){
                return AsistenciaProgramadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AsistenciaProgramadoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllFilter( filterAsistenciaProgramadoDto:FilterAsistenciaProgramadoDto, page:number, limit:number):Promise<AsistenciaProgramadoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;

            const { id_grupo_academico }   = filterAsistenciaProgramadoDto;

            const value =[id_grupo_academico,limit, offset];

            const query = `SELECT * FROM v_list_asistencia_programado WHERE id_grupo_academico=$1 
            ORDER BY fecha DESC LIMIT $2 OFFSET $3`;

            const result = await pool.query(query, value);

            if(result){
                return AsistenciaProgramadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AsistenciaProgramadoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive(page: number, limit: number): Promise<AsistenciaProgramadoEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const result = await pool.query("SELECT * FROM v_list_asistencia_programado AS response WHERE estado = true");
            if(result){
                return AsistenciaProgramadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AsistenciaProgramadoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch(error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }



}