// import { AsistenciaDatasource, AsistenciaEntityOu, RegisterAsistenciaDto } from "../../../../../domain/modulos/asistencia/index.js";
import { CustomError, AsistenciaDatasource, AsistenciaEntityOu, RegisterAsistenciaDto, UpdateAsistenciaDto, AsistenciaMarcadoEntityOu, ResumenMonthDto, ResumenMonthEntityOu, ResumenDayDto, ResumenDayEntityOu, ResumenAlumnoEntityOu, ResumenAlumnoDto  } from "../../../../../domain/index.js";
import { FilterAsistenciaDto } from "../../../../../domain/modules/asistencias/dtos/filter.asistencia.dto.js";
import { FilterAsistenciaMarcadoDto } from "../../../../../domain/modules/asistencias/dtos/filter.asistencia.marcado.dto.js";
import { PostgresConnection } from "../../../../database/index.js";

import { AsistenciaMapper } from "../../mappers/asistencia.mapper.js";
import { AsistenciaMarcadoMapper } from "../../mappers/asistencia.marcado.mapper.js";
import { ResumenAlumnoMapper } from "../../mappers/resumen.alumno.mapper.js";
import { ResumenDayMapper } from "../../mappers/resumen.day.mapper.js";
import { ResumenMonthMapper } from "../../mappers/resumen.month.mapper.js";
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

    async filterMarcado(
        filterAsistenciaMarcadoDto: FilterAsistenciaMarcadoDto,
        page: number,
        limit: number
    ): Promise<AsistenciaMarcadoEntityOu> {
        try {
            const { id_grupo_academico, id_matricula, fecha_inicio, fecha_fin } = filterAsistenciaMarcadoDto;
            const pool = PostgresConnection.getPool();

            // Si no vienen los parámetros obligatorios → retorna vacío sin ir a DB
            if (!id_grupo_academico || !id_matricula) {
                return AsistenciaMarcadoMapper.findEntityFromObject({
                    ok: true,
                    data: [],
                    message: 'Parámetros insuficientes',
                });
            }

            const values: any[] = [id_grupo_academico, id_matricula];

            // fecha_inicio y fecha_fin son opcionales — el procedure acepta NULL
            values.push(fecha_inicio ?? null);
            values.push(fecha_fin    ?? null);

            const dataQuery = `
                SELECT * FROM fn_asistencias_alumno(
                    p_id_grupo     := $1,
                    p_id_matricula := $2,
                    p_fecha_inicio := $3,
                    p_fecha_fin    := $4
                )
            `;
            const result = await pool.query(dataQuery, values);

            if (result) {
                return AsistenciaMarcadoMapper.findEntityFromObject({
                    ok: true,
                    data: result.rows,
                    message: 'Operación exitosa',
                });
            }

            return AsistenciaMarcadoMapper.findEntityFromObject({
                ok: false,
                data: [],
                message: 'Error al ejecutar la consulta',
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async update(id:string,updateAsistenciaDto:UpdateAsistenciaDto, by:string): Promise<AsistenciaEntityOu> {
        try {
            const { id_colegio,id_alumno } = updateAsistenciaDto;
            const pool = PostgresConnection.getPool();
            const query = `SELECT update_asistencia(p_id_col:=$1, p_id_alu:=$2,p_by:=$3) AS response`;
            const values = [id_colegio,id_alumno, by];
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


    async resumenMonth(
        resumenMonthDto: ResumenMonthDto,
        page: number,
        limit: number
    ): Promise<ResumenMonthEntityOu> {
        try {
            const pool = PostgresConnection.getPool();

            const {
                id_colegio,
                id_anio_academico,
                id_grupo_academico,
                month
            } = resumenMonthDto;

            const offset = (page - 1) * limit;

            const values = [
                id_colegio ?? null,
                id_anio_academico ?? null,
                id_grupo_academico ?? null,
                month ?? null,
                limit,
                offset,
            ];

            console.log('Values:', values);

            const query = `
                SELECT *
                FROM fn_resumen_asistencia_month(
                    p_cod_colegio := $1,
                    p_cod_anio_academico := $2,
                    p_cod_grupo := $3
                )
                WHERE ($4::INTEGER IS NULL OR mes = $4::INTEGER)
                ORDER BY mes DESC
                LIMIT $5 OFFSET $6
            `;

            const result = await pool.query(query, values);

            return ResumenMonthMapper.findEntityFromObject({
                ok: true,
                data: result.rows,
                message: 'Operación exitosa'
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async resumenDay( resumenDayDto:ResumenDayDto, page:number, limit:number):Promise<ResumenDayEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const { id_asistencia_programada } = resumenDayDto;
            const offset = (page - 1) * limit;

            const value =[id_asistencia_programada,limit, offset];

            const query = `SELECT * FROM fn_resumen_asistencia_day() WHERE id_asistencia_programada=$1 ORDER BY fecha DESC LIMIT $2 OFFSET $3`;

            const result = await pool.query(query, value);

            if(result){
                return ResumenDayMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ResumenDayMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async resumenAlumno( resumenAlumnoDto:ResumenAlumnoDto, page:number, limit:number):Promise<ResumenAlumnoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const { id_alumno } = resumenAlumnoDto;
            const offset = (page - 1) * limit;

            const value =[id_alumno,limit, offset];
            console.log(value, 'value');
            const query = `SELECT * FROM fn_resumen_asistencia_alumno($1) ORDER BY fecha DESC LIMIT $2 OFFSET $3`;

            const result = await pool.query(query, value);

            if(result){
                return ResumenAlumnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ResumenAlumnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}