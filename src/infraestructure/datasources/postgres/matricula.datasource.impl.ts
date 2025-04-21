
import { CustomError, FilterMatriculaEntityOu, MatriculaDatasource, MatriculaEntityOu, RegisterMatriculaDto } from "../../../domain/index.js";

//import { MatriculaModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { QR } from "../../../config/index.js";
import { MatriculaMapper } from "../../mappers/matricula/matricula.mapper.js";
import { FilterMatriculaMapper } from "../../mappers/matricula/filter.matricula.mapper.js";

export class MatriculaDatasourceImpl implements MatriculaDatasource { 

    async register(registerMatriculaDto: RegisterMatriculaDto): Promise<MatriculaEntityOu>{
        const { alumno_id, apoderado_id,seccion_id,registrador_usuario, turno} = registerMatriculaDto;
        const pool = PostgresDatabase.getPool();
        try {
            await pool.query('BEGIN');
            const anioQuery = `SELECT al.id AS anio_lectivo_id FROM tbl_seccion s JOIN tbl_grado g ON s.grado_id = g.id JOIN tbl_anio_lectivo al ON g.anio_lectivo_id = al.id WHERE s.id = $1`;
            const anioResult = await pool.query(anioQuery, [seccion_id]);

            if (anioResult.rows.length === 0) {
                throw CustomError.badRequest('La seccion no existe');
            }

            const anio_lectivo_id = anioResult.rows[0].anio_lectivo_id;

            const query = `INSERT INTO tbl_matricula (alumno_id,apoderado_id, seccion_id, anio_lectivo_id,registrador_usuario, turno) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values = [alumno_id, apoderado_id,seccion_id,anio_lectivo_id,registrador_usuario, turno];

            const result = await pool.query(query, values);
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return MatriculaMapper.matriculaEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return MatriculaMapper.matriculaEntityFromObject({ok:false,message:'Error'});


        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                if (error.constraint === 'tbl_matricula_alumno_id_anio_lectivo_id_key') {
                    throw CustomError.badRequest(`Ya existe la matricula`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_matricula_apoderado_id_fkey') {
                    throw CustomError.badRequest(`El apoderado no existe`);
                }
                if (error.constraint === 'tbl_matricula_alumno_id_fkey') {
                    throw CustomError.badRequest(`El alumno no existe`);
                }
                if (error.constraint === 'tbl_matricula_seccion_id_fkey') {
                    throw CustomError.badRequest(`La seccion no existe`);
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

    async findById (id:string): Promise<MatriculaEntityOu> {
        try {
            const pool = PostgresDatabase.getPool();
            const query = `SELECT * FROM tbl_matricula WHERE id = $1`;
            const result = await pool.query(query, [id]);

            if(result.rowCount===1){
                return MatriculaMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return MatriculaMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<MatriculaEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_matricula where estado = true");

            if(result){
                return MatriculaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return MatriculaMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {


            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterMatriculaGradoSeccion(id: string): Promise<FilterMatriculaEntityOu> {
        try {
            const pool = PostgresDatabase.getPool();
            await pool.query('BEGIN');
            const query = `select 
                mat.id,
                col.nombre_institucion,
                mat.turno,
                asi.hora_entrada,
                asi.hora_salida,
                niv.nivel,
                gra.grado,
                sec.seccion,
                asi.tardanza
                from tbl_matricula mat INNER JOIN tbl_asistencia asi
                on mat.id = asi.matricula_id INNER JOIN tbl_seccion sec
                on sec.id = mat.seccion_id INNER JOIN tbl_grado gra
                on gra.id = sec.grado_id INNER JOIN tbl_nivel niv
                on niv.id = gra.nivel_id  INNER JOIN tbl_anio_lectivo lec
                on lec.id = gra.anio_lectivo_id INNER JOIN tbl_colegio col
                on col.id = lec.colegio_id
                where asi.id =$1`;

            const result = await pool.query(query, [id]);
            await pool.query('COMMIT');
            if(result.rowCount!=0){
                return FilterMatriculaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return FilterMatriculaMapper.findEntityFromObject({ok:false,message:'Sin datos'})
        } catch (error:any) {
            if (error.code === '22P02') {
                throw CustomError.badRequest(`La sintaxis no es valida`);
            }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}