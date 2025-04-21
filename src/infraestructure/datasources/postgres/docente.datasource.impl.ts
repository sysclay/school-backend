
import { CustomError, DocenteDatasource, DocenteEntityOu, RegisterDocenteDto } from "../../../domain/index.js";
import { DocenteMapper } from "../../mappers/docente.mapper.js";
//import { DocenteModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { Validators } from "../../../utils/index.js";

export class DocenteDatasourceImpl implements DocenteDatasource { 

    async register(registerDocenteDto: RegisterDocenteDto): Promise<DocenteEntityOu>{
        const {persona_id} = registerDocenteDto;
        const pool = PostgresDatabase.getPool();

        try {
           
            const queryI = `INSERT INTO tbl_docente (persona_id) VALUES ($1) RETURNING *`;
            const valuesI = [persona_id];
            await pool.query('BEGIN'); 
            const resultI = await pool.query(queryI, valuesI); 
            await pool.query('COMMIT'); 

            if(resultI.rows.length>0){
                const find = resultI.rows.find(i=>String(i.persona_id)===String(persona_id));
                if (!find) { DocenteMapper.DocenteEntityFromObject({ok:false,message:'Docente no existe'}); }
                return DocenteMapper.DocenteEntityFromObject({ok:true, data:find,message:'Operación exitosa'});
            }

            return DocenteMapper.DocenteEntityFromObject({ok:false,message:'No se inserto'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                throw CustomError.badRequest(`El docente ya existe`);
            }
            if (error.code === '23503') {
                throw CustomError.badRequest(`El apoderado no existe`);
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

    async findById (id:string): Promise<DocenteEntityOu> {
        const pool = PostgresDatabase.getPool();
        try {
            const queryS = `SELECT 
            doc.id,
            doc.codigo_id,
            tdoc.nom_corto as doc_tipo,
            per.nro_documento,
            per.nombre,
            per.apellido_paterno,
            per.apellido_materno,
            per.email as correo,
            per.telefono,
            doc.estado
            FROM tbl_docente doc INNER JOIN tbl_persona per
            ON doc.persona_id = per.id INNER JOIN tbl_tipo_documento tdoc
            ON per.tipo_documento_id = tdoc.id
            WHERE doc.estado = true and doc.id=$1`
            const result = await pool.query(queryS, [id]);

            if(result.rowCount===1){
                return DocenteMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return DocenteMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<DocenteEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const queryS = `SELECT 
            doc.id,
            doc.codigo_id,
            tdoc.nom_corto as doc_tipo,
            per.nro_documento,
            per.nombre,
            per.apellido_paterno,
            per.apellido_materno,
            per.email as correo,
            per.telefono,
            doc.estado
            FROM tbl_docente doc INNER JOIN tbl_persona per
            ON doc.persona_id = per.id INNER JOIN tbl_tipo_documento tdoc
            ON per.tipo_documento_id = tdoc.id
            WHERE doc.estado = true`
            const result = await pool.query(queryS);

            if(result){
                return DocenteMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return DocenteMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}