
import { CustomError, AsistenciaDatasource, AsistenciaEntityOu, RegisterAsistenciaDto, UpdateEntradaAsistenciaDto, UpdateSalidaAsistenciaDto } from "../../../domain/index.js";
import { AsistenciaMapper } from "../../mappers/asistencia.mapper.js";
//import { AsistenciaModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { QR } from "../../../config/index.js";

export class AsistenciaDatasourceImpl implements AsistenciaDatasource { 

    async register(registerAsistenciaDto: RegisterAsistenciaDto): Promise<AsistenciaEntityOu>{
        const { matricula_id} = registerAsistenciaDto;
        const pool = PostgresDatabase.getPool();

        try {
            const query = `INSERT INTO tbl_asistencia (matricula_id ) VALUES ($1) RETURNING *`;
            const values = [matricula_id];
            await pool.query('BEGIN');
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return AsistenciaMapper.AsistenciaEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            console.log(error)
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                if (error.constraint === 'unique_asistencia_por_dia') {
                    throw CustomError.badRequest(`Ya existe asistencia para hoy`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_asistencia_matricula_id_fkey') {
                    throw CustomError.badRequest(`La matricula no existe`);
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

    async registerEntrada(nro_documento:string,updateEntradaAsistenciaDto:UpdateEntradaAsistenciaDto):Promise<AsistenciaEntityOu>{
        const { hora_entrada, registrador_entrada, tardanza} = updateEntradaAsistenciaDto;

        console.log('ENTRADA::',updateEntradaAsistenciaDto)

        const pool = PostgresDatabase.getPool();
        try {
            const query = `select 
            tbl_asistencia.id,
            tbl_asistencia.hora_entrada,
            tbl_asistencia.hora_salida,
            tbl_asistencia.registrador_entrada,
            tbl_asistencia.registrador_salida,
            tbl_asistencia.fecha_solo
            from tbl_alumno inner join tbl_matricula
            on tbl_alumno.id = tbl_matricula.alumno_id inner join tbl_asistencia
            on tbl_matricula.id = tbl_asistencia.matricula_id
            where nro_documento = $1 AND DATE(tbl_asistencia.fecha_solo) = CURRENT_DATE`;

            const values = [nro_documento];
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length===0){
                return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:'No encontrado'});
            }
            // if(result.rows[0].hora_entrada===null){
            //     return AsistenciaMapper.AsistenciaEntityFromObject({ok:false, message:'Primero debe marcar hora entrada'});
            // }
            if(result.rows[0].hora_entrada===null){

                const query1 = `update tbl_asistencia set hora_entrada=TO_TIMESTAMP($1, 'YYYY-MM-DD HH24:MI:SS'), registrador_entrada=$2, tardanza=$3  where id=$4 RETURNING *`;
                const formattedHoraSalida = hora_entrada.replace("T", " ").slice(0, 19); 
                const values1 = [formattedHoraSalida,registrador_entrada, tardanza, result.rows[0].id];
                await pool.query('BEGIN'); 
                const result1:any = await pool.query(query1, values1); 
                await pool.query('COMMIT'); 
                if(result1.rowCount>0){
                    return AsistenciaMapper.AsistenciaEntityFromObject({ok:true, data:result1.rows[0],message:'Operación exitosa'});
                } else {
                    return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:'No se actualiazo'});
                }

            }

            return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:'Ya se marco la entrada'});
        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async registerSalida(nro_documento:string,updateSalidaAsistenciaDto:UpdateSalidaAsistenciaDto):Promise<AsistenciaEntityOu>{
        const { hora_salida, registrador_salida} = updateSalidaAsistenciaDto;
        const pool = PostgresDatabase.getPool();
        try {
            const query = `select 
            tbl_asistencia.id,
            tbl_asistencia.hora_entrada,
            tbl_asistencia.hora_salida,
            tbl_asistencia.registrador_entrada,
            tbl_asistencia.registrador_salida,
            tbl_asistencia.fecha_solo
            from tbl_alumno inner join tbl_matricula
            on tbl_alumno.id = tbl_matricula.alumno_id inner join tbl_asistencia
            on tbl_matricula.id = tbl_asistencia.matricula_id
            where nro_documento = $1 AND DATE(tbl_asistencia.fecha_solo) = CURRENT_DATE`;

            const values = [nro_documento];
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length===0){
                return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:'No encontrado'});
            }
            if(result.rows[0].hora_entrada===null){
                return AsistenciaMapper.AsistenciaEntityFromObject({ok:false, message:'Primero debe marcar hora entrada'});
            }
            if(result.rows[0].hora_salida===null){
                const query1 = `update tbl_asistencia set hora_salida=TO_TIMESTAMP($1, 'YYYY-MM-DD HH24:MI:SS'), registrador_salida=$2 where id=$3 RETURNING *`;
                const formattedHoraSalida = hora_salida.replace("T", " ").slice(0, 19); 
                const values1 = [formattedHoraSalida,registrador_salida,result.rows[0].id];
                await pool.query('BEGIN'); 
                const result1:any = await pool.query(query1, values1); 
                await pool.query('COMMIT'); 
                if(result1.rowCount>0){
                    return AsistenciaMapper.AsistenciaEntityFromObject({ok:true, data:result1.rows[0],message:'Operación exitosa'});
                } else {
                    return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:'No se actualiazo'});
                }
            }

            return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:'Ya se marco la salida'});
        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findById (id:string): Promise<AsistenciaEntityOu> {
        try {
            const pool = PostgresDatabase.getPool();
            const query = `SELECT * FROM tbl_asistencia WHERE id = $1`;
            const result = await pool.query(query, [id]);
            // console.log('ID::',result)
            if(result.rowCount===1){
                return AsistenciaMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return AsistenciaMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    //async findByNameCorto(nom_corto:string): Promise<AsistenciaEntityOu> {
    //    try {
    //        return AsistenciaMapper.findByNameCortoEntityFromObject({ok:true, data:'documento',message:'Operación //exitosa'});
    //    } catch (error) {
    //        if(error instanceof CustomError){
    //        throw error;
    //        }
    //        throw CustomError.internalServer();
    //    }
    //}

    async findAll():Promise<AsistenciaEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_asistencia where estado = true");
            //console.log('LISTA',result)
            if(result){
                return AsistenciaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AsistenciaMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}