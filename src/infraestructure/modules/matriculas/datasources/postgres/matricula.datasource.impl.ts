
import { CustomError, FilterMatriculaDto, MatriculaDatasource, MatriculaEntityOu, RegisterMatriculaDto  } from "../../../../../domain/index.js";
import { MatriculaMapper } from "../../mappers/matricula.mapper.js";

import { PostgresConnection } from "../../../../database/postgres/index.js";

export class MatriculaDatasourceImpl implements MatriculaDatasource { 

    async register(registerMatriculaDto: RegisterMatriculaDto,by:string): Promise<MatriculaEntityOu>{
        const { id_alumno,id_grupo, id_academico, id_matricula_estado,id_matricula_ingreso,repitente} = registerMatriculaDto;
        const pool = PostgresConnection.getPool();
        try {   
            const fields = [
                { key: 'p_id_alu', value: id_alumno},
                { key: 'p_id_gru', value: id_grupo},
                { key: 'p_id_mat_es', value: id_matricula_estado},
                { key: 'p_id_mat_in', value: id_matricula_ingreso},
                { key: 'p_id_aca', value: id_academico},
                { key: 'p_rep', value: repitente},
                { key: 'p_by', value: by }
            ];

            // Filtrar solo los campos que no son null ni undefined
            const filteredFields = fields.filter(f => f.value !== undefined && f.value !== null && f.value !== '');
            const paramPlaceholders = filteredFields.map((_, idx) => `$${idx + 1}`);
            const paramNames = filteredFields.map(f => `${f.key}:=${paramPlaceholders.shift()}`).join(', ');
            const values = filteredFields.map(f => f.value);


            await pool.query('BEGIN');
            const query = `SELECT insertar_matricula(${paramNames}) AS response`;

            const result = await pool.query(query, values);
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                 if(result.rows[0].response.ok){
                    return MatriculaMapper.matriculaEntityFromObject({ok:result.rows[0].response.ok, data:result.rows[0],message:result.rows[0].response.message});
                 }
                return MatriculaMapper.matriculaEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return MatriculaMapper.matriculaEntityFromObject({ok:false,message:'Error'});
        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    // async findById (id:string): Promise<MatriculaEntityOu> {
    //     try {
    //         const pool = PostgresDatabase.getPool();
    //         const query = `SELECT * FROM tbl_matricula WHERE id = $1`;
    //         const result = await pool.query(query, [id]);

    //         if(result.rowCount===1){
    //             return MatriculaMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
    //         }
    //         return MatriculaMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

    //     } catch (error) {
    //         if(error instanceof CustomError){
    //             throw error;
    //         }
    //         throw CustomError.internalServer();
    //     }
    // }

    async findAll(page:number, limit:number,):Promise<MatriculaEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;

            const values: any[] = [];

            values.push(limit);
            const limitIndex = values.length;
            values.push(offset);
            const offsetIndex = values.length;

            const dataQuery = `SELECT * FROM v_list_matriculas ORDER BY fecha_registro LIMIT $${limitIndex} OFFSET $${offsetIndex}`;
            const countQuery = `SELECT COUNT(*) AS total FROM v_list_matriculas`;

            const [dataResult, countResult] = await Promise.all([
                pool.query(dataQuery, values),
                pool.query(countQuery, values.slice(0, values.length - 2))
            ]);
            const total = Number(countResult.rows[0].total);
            const totalPages = Math.ceil(total / limit);

            return MatriculaMapper.findEntityFromObject({ 
                ok: true, 
                data: dataResult.rows, 
                message: 'Operación exitosa',
                total,
                page,
                limit,
                totalPages
            });

        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


    async filter(filterMatriculaDto: FilterMatriculaDto,page:number, limit:number,): Promise<MatriculaEntityOu> {

        try {

            const { id_anio_academico_colegio, id_grupo_academico, id_colegio, id_nivel, id_grado, id_seccion, id_alumno } = filterMatriculaDto;
            const offset = (page - 1) * limit;
            const pool = PostgresConnection.getPool();
            const conditions: string[] = [];
            const values: any[] = [];
            if (id_anio_academico_colegio) {
                values.push(id_anio_academico_colegio);
                conditions.push(`id_anio_academico_colegio = $${values.length}`);
            }
            if (id_grupo_academico) {
                values.push(id_grupo_academico);
                conditions.push(`id_grupo_academico = $${values.length}`);
            }
            if (id_colegio) {
                values.push(id_colegio);
                conditions.push(`id_colegio = $${values.length}`);
            }
            if (id_nivel) {
                values.push(id_nivel);
                conditions.push(`id_nivel = $${values.length}`);
            }
            if (id_grado) {
                values.push(id_grado);
                conditions.push(`id_grado = $${values.length}`);
            }
            if (id_seccion) {
                values.push(id_seccion);
                conditions.push(`id_seccion = $${values.length}`);
            }
            if (id_alumno) {
                values.push(id_alumno);
                conditions.push(`id_alumno = $${values.length}`);
            }
            const whereClause = conditions.length? `WHERE ${conditions.join(' AND ')}`: '';

            values.push(limit);
            const limitIndex = values.length;
            values.push(offset);
            const offsetIndex = values.length;

            const dataQuery = `SELECT * FROM v_list_matriculas ${whereClause} ORDER BY fecha_registro LIMIT $${limitIndex} OFFSET $${offsetIndex}`;
            const countQuery = `SELECT COUNT(*) AS total FROM v_list_matriculas ${whereClause}`;

            const [dataResult, countResult] = await Promise.all([
                pool.query(dataQuery, values),
                pool.query(countQuery, values.slice(0, values.length - 2))
            ]);
// 
            const total = Number(countResult.rows[0].total);
            const totalPages = Math.ceil(total / limit);

            // console.log(dataResult.rows)
            return MatriculaMapper.findEntityFromObject({ 
                ok: true, 
                data: dataResult.rows, 
                message: 'Operación exitosa',
                total,
                page,
                limit,
                totalPages
            });
        } catch (error: any) {
            // await pool.query('ROLLBACK');
            // console.log(error)
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }

    // async filterMatriculaGradoSeccion(id: string): Promise<FilterMatriculaEntityOu> {
    //     try {
    //         const pool = PostgresDatabase.getPool();
    //         await pool.query('BEGIN');
    //         const query = `select 
    //             mat.id,
    //             col.nombre_institucion,
    //             mat.turno,
    //             asi.hora_entrada,
    //             asi.hora_salida,
    //             niv.nivel,
    //             gra.grado,
    //             sec.seccion,
    //             asi.tardanza
    //             from tbl_matricula mat INNER JOIN tbl_asistencia asi
    //             on mat.id = asi.matricula_id INNER JOIN tbl_seccion sec
    //             on sec.id = mat.seccion_id INNER JOIN tbl_grado gra
    //             on gra.id = sec.grado_id INNER JOIN tbl_nivel niv
    //             on niv.id = gra.nivel_id  INNER JOIN tbl_anio_lectivo lec
    //             on lec.id = gra.anio_lectivo_id INNER JOIN tbl_colegio col
    //             on col.id = lec.colegio_id
    //             where asi.id =$1`;

    //         const result = await pool.query(query, [id]);
    //         await pool.query('COMMIT');
    //         if(result.rowCount!=0){
    //             return FilterMatriculaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
    //         }
    //         return FilterMatriculaMapper.findEntityFromObject({ok:false,message:'Sin datos'})
    //     } catch (error:any) {
    //         if (error.code === '22P02') {
    //             throw CustomError.badRequest(`La sintaxis no es valida`);
    //         }
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }
}