
import { CustomError, ApoderadoDatasource, ApoderadoEntityOu, RegisterApoderadoDto, FilterApoderadoAlumnoDto, FilterApoderadoEntityOu } from "../../../domain/index.js";
import { ApoderadoMapper } from "../../mappers/apoderado/apoderado.mapper.js";
//import { ApoderadoModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";

import { Validators } from "../../../utils/index.js";
import { FilterApoderadoMapper } from "../../mappers/apoderado/filter.apoderado.mapper.js";

export class ApoderadoDatasourceImpl implements ApoderadoDatasource { 

    async register(registerApoderadoDto: RegisterApoderadoDto): Promise<ApoderadoEntityOu>{
        const {persona_id} = registerApoderadoDto;
        const pool = PostgresDatabase.getPool();
        try {
           
            const queryI = `INSERT INTO tbl_apoderado (persona_id) VALUES ($1) RETURNING *`;
            const valuesI = [ persona_id];
            await pool.query('BEGIN'); 
            const resultI = await pool.query(queryI, valuesI); 
            await pool.query('COMMIT'); 

            if(resultI.rows.length>0){
                const find = resultI.rows.find(i=>String(i.persona_id)===String(persona_id));
                if (!find) { ApoderadoMapper.ApoderadoEntityFromObject({ok:false,message:'Apoderado no existe'}); }
                return ApoderadoMapper.ApoderadoEntityFromObject({ok:true, data:find,message:'Operación exitosa'});
            }
            return ApoderadoMapper.ApoderadoEntityFromObject({ok:false,message:'No se inserto'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                throw CustomError.badRequest(`El apoderado ya existe`);
            }
            if (error.code === '23503') {
                throw CustomError.badRequest(`El persona no existe`);
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

    async findById (id:string): Promise<ApoderadoEntityOu> {
        const pool = PostgresDatabase.getPool();
        try {
            const queryS = `SELECT 
            apo.id,
            apo.codigo_id,
            doc.nom_corto as doc_tipo,
            per.nro_documento,
            per.nombre,
            per.apellido_paterno,
            per.apellido_materno,
            per.email as correo,
            per.telefono,
            apo.estado
            FROM tbl_apoderado apo INNER JOIN tbl_persona per
            ON apo.persona_id = per.id INNER JOIN tbl_tipo_documento doc
            ON per.tipo_documento_id = doc.id
            WHERE apo.estado = true and apo.id = $1`
            const result = await pool.query(queryS, [id]);

            if(result.rowCount===1){
                return ApoderadoMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return ApoderadoMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<ApoderadoEntityOu>{
        const pool = PostgresDatabase.getPool();
        try {
            const queryS = `SELECT 
            apo.id,
            apo.codigo_id,
            doc.nom_corto as doc_tipo,
            per.nro_documento,
            per.nombre,
            per.apellido_paterno,
            per.apellido_materno,
            per.email as correo,
            per.telefono,
            apo.estado
            FROM tbl_apoderado apo INNER JOIN tbl_persona per
            ON apo.persona_id = per.id INNER JOIN tbl_tipo_documento doc
            ON per.tipo_documento_id = doc.id
            WHERE apo.estado = true`
            const result = await pool.query(queryS);

            if(result){
                return ApoderadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ApoderadoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterApoderadoAlumno(filterApoderadoAlumnoDto: FilterApoderadoAlumnoDto): Promise<FilterApoderadoEntityOu> {
        const {nro_documento, year} = filterApoderadoAlumnoDto;
        const pool = PostgresDatabase.getPool();
        try {
            const queryS = `SELECT
            alu.id as alumno_id,
            mat.id as matricula_id,
            alu.codigo_qr,
            mat.turno,
            pea.nro_documento,
            pea.nombre,
            pea.apellido_paterno,
            pea.apellido_materno,
            pea.telefono,
            gra.grado,
            gra.grado_alias as alias,
            gra.grado_desc as descripcion,
            sec.seccion,
            niv.nivel,
            lec.anio
            FROM tbl_persona per INNER JOIN tbl_apoderado apo
            ON per.id=apo.persona_id INNER JOIN tbl_matricula mat
            ON apo.id=mat.apoderado_id INNER JOIN tbl_alumno alu
            ON alu.id=mat.alumno_id INNER JOIN tbl_persona pea
            ON pea.id=alu.persona_id INNER JOIN tbl_seccion sec
            ON sec.id=mat.seccion_id INNER JOIN tbl_grado gra
            ON gra.id=sec.grado_id INNER JOIN tbl_nivel niv
            ON niv.id=gra.nivel_id INNER JOIN tbl_anio_lectivo lec
            ON lec.id=gra.anio_lectivo_id
            WHERE per.nro_documento=$1 and lec.anio=$2`
            const result = await pool.query(queryS,[nro_documento, year]);

            if(result){
                const qrUpdate = result.rows.map((i:any) => {
                    const qrBuffer: Buffer = i.codigo_qr;
                    const qrBase64 = qrBuffer.toString("base64"); // 🔹 Convertir a Base64
                    return { ...i, codigo_qr: `data:image/png;base64,${qrBase64}` };
                });
                return FilterApoderadoMapper.findEntityFromObject({ok:true, data:qrUpdate,message:'Operación exitosa'})
            }
            return FilterApoderadoMapper.findEntityFromObject({ok:false,message:'Error'})

        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


}