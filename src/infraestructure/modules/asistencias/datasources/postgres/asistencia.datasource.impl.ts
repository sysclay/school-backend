// import { AsistenciaDatasource, AsistenciaEntityOu, RegisterAsistenciaDto } from "../../../../../domain/modulos/asistencia/index.js";
import { CustomError, AsistenciaDatasource, AsistenciaEntityOu, RegisterAsistenciaDto, UpdateAsistenciaDto  } from "../../../../../domain/index.js";
import { FilterAsistenciaDto } from "../../../../../domain/modules/asistencias/dtos/filter.asistencia.dto.js";
import { PostgresConnection } from "../../../../database/index.js";

import { AsistenciaMapper } from "../../mappers/asistencia.mapper.js";
// import { PostgresDatabase } from "../../../../../data/postgres/index.js";

export class AsistenciaDatasourceImpl implements AsistenciaDatasource { 

    async register(registerAsistenciaDto: RegisterAsistenciaDto,by:string): Promise<AsistenciaEntityOu>{
        const { id_colegio,id_alumno, justificacion } = registerAsistenciaDto;
        const pool = PostgresConnection.getPool();
        try {
            const values = [id_colegio,id_alumno, justificacion,  by ];
            const query = `SELECT insertar_asistencia(p_id_col:=$1, p_id_alu:=$2,p_jus:=$3,p_by:=$4) AS response`;

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                return AsistenciaMapper.asistenciaEntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message, 
                    data:result.rows[0].response.data,
                    meta:result.rows[0].response.meta
                });
            }

            return AsistenciaMapper.asistenciaEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            // console.log(error)
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async filter(filterAsistenciaDto:FilterAsistenciaDto): Promise<AsistenciaEntityOu> {
        try {
            const { id_matricula, fecha,id_asistencia_programado } = filterAsistenciaDto;
            const pool = PostgresConnection.getPool();
            const conditions: string[] = [];
            const values: any[] = [];
            if (id_matricula) {
                values.push(id_matricula);
                conditions.push(`id_matricula = $${values.length}`);
            }
            if (fecha) {
                values.push(fecha);
                conditions.push(`fecha = $${values.length}`);
            }
            if (id_asistencia_programado) {
                values.push(id_asistencia_programado);
                conditions.push(`id_asistencia_programado = $${values.length}`);
            }
            const whereClause = conditions.length? `WHERE ${conditions.join(' AND ')}`: '';

            const dataQuery = `SELECT * FROM v_list_asistencia ${whereClause} ORDER BY fecha`;

            const [result] = await Promise.all([
                pool.query(dataQuery, values)
            ]);
            if(result){
                return AsistenciaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AsistenciaMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch(error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async update(id:string,updateAsistenciaDto:UpdateAsistenciaDto, by:string): Promise<AsistenciaEntityOu> {
        try {
            const { id_alumno } = updateAsistenciaDto;
            const pool = PostgresConnection.getPool();
            const query = `SELECT update_asistencia(p_id_alu:=$1,p_by:=$2) AS response`;
            const values = [id_alumno, by];
            const result = await pool.query(query, values);
            if(result){
                return AsistenciaMapper.findByIdEntityFromObject({
                    ok:result.rows[0].response.ok, 
                    data:result.rows[0].response.data,
                    message:result.rows[0].response.message,
                    meta:result.rows[0].response.meta
                })
            }
            return AsistenciaMapper.findByIdEntityFromObject({ok:false,message:'Error'})
        } catch(error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}