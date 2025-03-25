
import { CustomError, AlumnoDatasource, AlumnoEntityOu, RegisterAlumnoDto, FilterAlumnoDto } from "../../../domain/index.js";
import { AlumnoMapper } from "../../mappers/alumno.mapper.js";
//import { AlumnoModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { QR } from "../../../config/index.js";

export class AlumnoDatasourceImpl implements AlumnoDatasource { 

    async register(registerAlumnoDto: RegisterAlumnoDto): Promise<AlumnoEntityOu>{
        const { nombre, apellido_paterno, apellido_materno, nro_documento,tipo_documento_id} = registerAlumnoDto;
        const pool = PostgresDatabase.getPool();
        const qrBase64 = await QR.generate(`${nro_documento}`)
        const base64Data = qrBase64.split(",")[1];
        const qrBuffer  = Buffer.from(base64Data, "base64");
        try {
           
            const query = `INSERT INTO tbl_alumno (nombre,apellido_paterno, apellido_materno,nro_documento,codigo_qr,tipo_documento_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values = [nombre, apellido_paterno,apellido_materno, nro_documento, qrBuffer, tipo_documento_id];
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                return AlumnoMapper.AlumnoEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return AlumnoMapper.AlumnoEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            // console.log(error)
            if (error.code === '23505') {
                return AlumnoMapper.AlumnoEntityFromObject({ok:false,message:'El numero documento ya existe'});
                // throw CustomError.badRequest(`El numero documento ya existe`);
            }
            if (error.code === '23503') {
                throw CustomError.badRequest(`El tipo documento no existe`);
            }

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findById (id:string): Promise<AlumnoEntityOu> {
        try {
            const pool = PostgresDatabase.getPool();
            const query = `SELECT * FROM tbl_alumno WHERE id = $1`;
            const result = await pool.query(query, [id]);
            // console.log('ID::',result)
            if(result.rowCount===1){
                const qrBuffer: Buffer = result.rows[0].codigo_qr;
                const qrBase64 = qrBuffer.toString("base64"); // 🔹 Convertir a Base64
                console.log(`data:image/png;base64,${qrBase64}`)
                return AlumnoMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return AlumnoMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    //async findByNameCorto(nom_corto:string): Promise<AlumnoEntityOu> {
    //    try {
    //        return AlumnoMapper.findByNameCortoEntityFromObject({ok:true, data:'documento',message:'Operación //exitosa'});
    //    } catch (error) {
    //        if(error instanceof CustomError){
    //        throw error;
    //        }
    //        throw CustomError.internalServer();
    //    }
    //}

    async findAll():Promise<AlumnoEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_alumno where estado = true");
            //console.log('LISTA',result)
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
            const { nro_documento } = filterAlumnoDto;
            const pool = PostgresDatabase.getPool();

            const query = `SELECT * FROM tbl_alumno where estado = true and nro_documento=$1`;
            const values = [nro_documento];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            // console.log(result)
            if(result){
                if(result.rowCount===0){
                    return AlumnoMapper.findEntityFromObject({ok:false, data:result.rows,message:'No encontrado'})
                }
                return AlumnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AlumnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateQR (id:string): Promise<AlumnoEntityOu> {
        try {
            const pool = PostgresDatabase.getPool();
            const query = `SELECT * FROM tbl_alumno WHERE id = $1`;
            const result = await pool.query(query, [id]);
            if(result.rowCount===1){
                const qrBase64 = await QR.generate(`${result.rows[0].nro_documento}`)
                const base64Data = qrBase64.split(",")[1];
                const qrBuffer  = Buffer.from(base64Data, "base64");
                // console.log(`data:image/png;base64,${qrBase64}`)
                const query1 = `update tbl_alumno set codigo_qr=$1 where id=$2 RETURNING *`;
                const values1 = [qrBuffer,id];
                await pool.query('BEGIN'); 
                const result1:any = await pool.query(query1, values1); 
                await pool.query('COMMIT'); 
                if(result1.rowCount>0){
                    return AlumnoMapper.findByIdEntityFromObject({ok:true, data:result1.rows[0],message:'Operación exitosa'});
                } else {
                    return AlumnoMapper.findByIdEntityFromObject({ok:false,message:'No se actualiazo'});
                }
            }
            return AlumnoMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}