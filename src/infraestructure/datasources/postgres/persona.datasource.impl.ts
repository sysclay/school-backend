
import { CustomError, PersonaDatasource, PersonaEntityOu, RegisterPersonaDto, FilterPersonaDto } from "../../../domain/index.js";
import { PersonaMapper } from "../../mappers/persona.mapper.js";
//import { PersonaModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { QR } from "../../../config/index.js";
import { Validators } from "../../../utils/index.js";

export class PersonaDatasourceImpl implements PersonaDatasource { 

    async register(registerPersonaDto: RegisterPersonaDto): Promise<PersonaEntityOu>{
        const { nombre, apellido_paterno, apellido_materno,telefono,correo, nro_documento,tipo_documento_id} = registerPersonaDto;
        console.log(registerPersonaDto)
        const pool = PostgresDatabase.getPool();
        try {
           
            const query = `INSERT INTO tbl_persona (nombre,apellido_paterno, apellido_materno,telefono,email,nro_documento,tipo_documento_id) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *`;
            const values = [Validators.capitalizar(nombre), Validators.capitalizar(apellido_paterno),Validators.capitalizar(apellido_materno),telefono, correo.toLocaleLowerCase(), nro_documento.toLocaleLowerCase(), tipo_documento_id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                return PersonaMapper.PersonaEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return PersonaMapper.PersonaEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            console.log(error)
            if (error.code === '23505') {
                // return PersonaMapper.PersonaEntityFromObject({ok:false,message:'El numero documento ya existe'});
                if (error.constraint === 'tbl_persona_nro_documento_key') {
                    throw CustomError.badRequest(`El numero documento ya existe`);
                }
                if (error.constraint === 'tbl_persona_email_key') {
                    throw CustomError.badRequest(`El correo ya existe`);
                }
                if (error.constraint === 'tbl_email_telefono_key') {
                    throw CustomError.badRequest(`El telefono ya existe`);
                }
                // throw CustomError.badRequest(`El numero documento ya existe`);
            }
            if (error.code === '23503') {
                throw CustomError.badRequest(`El tipo documento no existe`);
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

    // async findById (id:string): Promise<PersonaEntityOu> {
    //     try {
    //         const pool = PostgresDatabase.getPool();
    //         const query = `SELECT * FROM tbl_Persona WHERE id = $1`;
    //         const result = await pool.query(query, [id]);

    //         if(result.rowCount===1){
    //             const qrBuffer: Buffer = result.rows[0].codigo_qr;
    //             const qrBase64 = qrBuffer.toString("base64"); // 🔹 Convertir a Base64
    //             console.log(`data:image/png;base64,${qrBase64}`)
    //             return PersonaMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
    //         }
    //         return PersonaMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

    //     } catch (error) {
    //         if(error instanceof CustomError){
    //             throw error;
    //         }
    //         throw CustomError.internalServer();
    //     }
    // }

    // async findAll():Promise<PersonaEntityOu>{
    //     try {
    //         const pool = PostgresDatabase.getPool();
    //         const result = await pool.query("SELECT * FROM tbl_Persona where estado = true");

    //         if(result){
    //             return PersonaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
    //         }
    //         return PersonaMapper.findEntityFromObject({ok:false,message:'Error'})
    //     } catch (error) {
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }

    // async filterAll(filterPersonaDto:FilterPersonaDto):Promise<PersonaEntityOu>{
    //     try {
    //         const { nro_documento } = filterPersonaDto;
    //         const pool = PostgresDatabase.getPool();

    //         const query = `SELECT * FROM tbl_Persona where estado = true and nro_documento=$1`;
    //         const values = [nro_documento];

    //         await pool.query('BEGIN'); 
    //         const result = await pool.query(query, values); 
    //         await pool.query('COMMIT'); 

    //         if(result){
    //             if(result.rowCount===0){
    //                 return PersonaMapper.findEntityFromObject({ok:false, data:result.rows,message:'No encontrado'})
    //             }
    //             return PersonaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
    //         }
    //         return PersonaMapper.findEntityFromObject({ok:false,message:'Error'})
    //     } catch (error) {
            
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }

    // async updateQR (id:string): Promise<PersonaEntityOu> {
    //     try {
    //         const pool = PostgresDatabase.getPool();
    //         const query = `SELECT * FROM tbl_Persona WHERE id = $1`;
    //         const result = await pool.query(query, [id]);
            
    //         if(result.rowCount===1){
    //             const qrBase64 = await QR.generate(`${result.rows[0].nro_documento}`)
    //             const base64Data = qrBase64.split(",")[1];
    //             const qrBuffer  = Buffer.from(base64Data, "base64");

    //             const query1 = `update tbl_Persona set codigo_qr=$1 where id=$2 RETURNING *`;
    //             const values1 = [qrBuffer,id];
    //             await pool.query('BEGIN'); 
    //             const result1:any = await pool.query(query1, values1); 
    //             await pool.query('COMMIT'); 
    //             if(result1.rowCount>0){
    //                 return PersonaMapper.findByIdEntityFromObject({ok:true, message:'Se actualiazo'});
    //             } else {
    //                 return PersonaMapper.findByIdEntityFromObject({ok:false,message:'No se actualiazo'});
    //             }
    //         }
    //         return PersonaMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

    //     } catch (error) {

    //         if(error instanceof CustomError){
    //             throw error;
    //         }
    //         throw CustomError.internalServer();
    //     }
    // }
}