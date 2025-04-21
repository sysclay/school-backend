
import { CustomError, AlumnoDatasource, AlumnoEntityOu, RegisterAlumnoDto, FilterAlumnoDto } from "../../../domain/index.js";
import { AlumnoMapper } from "../../mappers/alumno.mapper.js";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { QR } from "../../../config/index.js";

export class AlumnoDatasourceImpl implements AlumnoDatasource { 

    async register(registerAlumnoDto: RegisterAlumnoDto): Promise<AlumnoEntityOu>{
        const { persona_id} = registerAlumnoDto;
        const pool = PostgresDatabase.getPool();
        try {
            await pool.query('BEGIN'); 
            const queryI = `INSERT INTO tbl_alumno (persona_id) VALUES ($1) RETURNING *`;
            const valuesI = [ persona_id];
            const resultI = await pool.query(queryI, valuesI); 
           
            if(resultI.rows.length>0){
                const find = resultI.rows.find(i=>String(i.persona_id)===String(persona_id));
                if (!find) { AlumnoMapper.AlumnoEntityFromObject({ok:false,message:'Alumno no existe'}); }

                const qrBase64 = await QR.generate(`${find.codigo_id}`)
                const base64Data = qrBase64.split(",")[1];
                const qrBuffer  = Buffer.from(base64Data, "base64");
                const queryU = `UPDATE tbl_alumno SET codigo_qr=$1 where id=$2`;
                const valuesU = [ qrBuffer,find.id];
                const resultU = await pool.query(queryU, valuesU);
                await pool.query('COMMIT');
                if(resultU.rowCount !== null && resultU.rowCount>0){
                    return AlumnoMapper.findByIdEntityFromObject({ok:true, data:find, message:'Operación exitosa'});
                } 
                return AlumnoMapper.AlumnoEntityFromObject({ok:true,message:'No se actualizo'});
            }
            return AlumnoMapper.AlumnoEntityFromObject({ok:false,message:'No se inserto'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') { throw CustomError.badRequest(`El alumno ya existe`); }
            if (error.code === '23503') { throw CustomError.badRequest(`La persona no existe`); }
            if (error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findById (id:string): Promise<AlumnoEntityOu> {
        const pool = PostgresDatabase.getPool();
        try {
            await pool.query('BEGIN'); 
            const queryS = `SELECT 
            alu.id,
            alu.codigo_id,
            doc.nom_corto as doc_tipo,
            per.nro_documento,
            per.nombre,
            per.apellido_paterno,
            per.apellido_materno,
            per.email as correo,
            per.telefono,
            alu.codigo_qr,
            alu.estado
            FROM tbl_alumno alu INNER JOIN tbl_persona per
            ON alu.persona_id = per.id INNER JOIN tbl_tipo_documento doc
            ON per.tipo_documento_id = doc.id
            WHERE alu.estado = true and alu.id=$1`
            const result = await pool.query(queryS, [id]);
            await pool.query('COMMIT');
            if(result.rowCount===1){

                console.log(result.rows)
                const qrBuffer: Buffer = result.rows[0].codigo_qr;
                const qrBase64 = qrBuffer.toString("base64"); // 🔹 Convertir a Base64
                console.log(`data:image/png;base64,${qrBase64}`)

                return AlumnoMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return AlumnoMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<AlumnoEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const queryS = `SELECT 
            alu.id,
            alu.codigo_id,
            doc.nom_corto as doc_tipo,
            per.nro_documento,
            per.nombre,
            per.apellido_paterno,
            per.apellido_materno,
            per.email as correo,
            per.telefono,
            alu.estado
            FROM tbl_alumno alu INNER JOIN tbl_persona per
            ON alu.persona_id = per.id INNER JOIN tbl_tipo_documento doc
            ON per.tipo_documento_id = doc.id
            WHERE alu.estado = true`
            const result = await pool.query(queryS);

            if(result){
                return AlumnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AlumnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterAll(filterAlumnoDto:FilterAlumnoDto):Promise<AlumnoEntityOu>{
        try {
            const { codigo } = filterAlumnoDto;
            const pool = PostgresDatabase.getPool();
            const queryS = `SELECT 
            alu.id,
            alu.codigo_id,
            doc.nom_corto as doc_tipo,
            per.nro_documento,
            per.nombre,
            per.apellido_paterno,
            per.apellido_materno,
            per.email as correo,
            per.telefono,
            alu.estado
            FROM tbl_alumno alu INNER JOIN tbl_persona per
            ON alu.persona_id = per.id INNER JOIN tbl_tipo_documento doc
            ON per.tipo_documento_id = doc.id
            WHERE alu.estado = true and alu.codigo_id=$1`
            const values = [codigo];

            await pool.query('BEGIN'); 
            const result = await pool.query(queryS, values); 
            await pool.query('COMMIT'); 

            if(result){
                if(result.rowCount===0){
                    return AlumnoMapper.findEntityFromObject({ok:false, data:result.rows,message:'No encontrado'})
                }
                return AlumnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AlumnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateQR (id:string): Promise<AlumnoEntityOu> {
        const pool = PostgresDatabase.getPool();
        try {
            await pool.query('BEGIN'); 
            const query = `SELECT * FROM tbl_alumno WHERE id = $1`;
            const result = await pool.query(query, [id]);
            
            if(result.rowCount===1){
                const qrBase64 = await QR.generate(`${result.rows[0].codigo_id}`)
                const base64Data = qrBase64.split(",")[1];
                const qrBuffer  = Buffer.from(base64Data, "base64");

                const queryU = `update tbl_alumno set codigo_qr=$1 where id=$2 RETURNING *`;
                const valuesU = [qrBuffer,id];
                const resultU:any = await pool.query(queryU, valuesU); 
                await pool.query('COMMIT'); 
                if(resultU.rowCount>0){
                    return AlumnoMapper.findByIdEntityFromObject({ok:true, message:'Se actualiazo'});
                } else {
                    return AlumnoMapper.findByIdEntityFromObject({ok:false,message:'No se actualiazo'});
                }
            }
            return AlumnoMapper.findByIdEntityFromObject({ok:false,message:'No encontrado'})

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}