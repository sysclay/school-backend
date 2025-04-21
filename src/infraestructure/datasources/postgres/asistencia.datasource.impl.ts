
import { CustomError, AsistenciaDatasource, AsistenciaEntityOu, RegisterAsistenciaDto, UpdateEntradaAsistenciaDto, UpdateSalidaAsistenciaDto, FilterClaseAsistenciaDto } from "../../../domain/index.js";
import { AsistenciaMapper } from "../../mappers/asistencia.mapper.js";

import { PostgresDatabase } from "../../../data/postgres/index.js";

export class AsistenciaDatasourceImpl implements AsistenciaDatasource { 

    async register(registerAsistenciaDto: RegisterAsistenciaDto): Promise<AsistenciaEntityOu>{

        const { matricula_id, hora_entrada, hora_llegada, registrador_entrada,fecha} = registerAsistenciaDto;
        const pool = PostgresDatabase.getPool();
        try {
            await pool.query('BEGIN');
            const query0 = `SELECT 1 FROM tbl_asistencia WHERE matricula_id = $1 AND fecha = $2 LIMIT 1 `;
            const val = [matricula_id, fecha];
            const existe = await pool.query(query0, val);

            if ((existe.rowCount??0)>0) { throw CustomError.badRequest('Ya existe asistencia para hoy'); }

            // Comparar diferencia en minutos
            const entradaDate = new Date(`${fecha}T${hora_entrada}Z`);
            const llegadaDate = new Date(`${fecha}T${hora_llegada}Z`);
            const diffMin = (llegadaDate.getTime() - entradaDate.getTime()) / (1000 * 60);
            // console.log('RESSS::',registerAsistenciaDto)
            if (diffMin < -60) { throw  CustomError.badRequest("Solo se puede registrar desde 1 hora antes de la hora de entrada"); }
            if (diffMin > 60) { throw  CustomError.badRequest("Hora de llegada fuera de rango, ya se considera falta"); }
            const tardanza = diffMin > 0;

            const query = `INSERT INTO tbl_asistencia (matricula_id, hora_entrada, tardanza, registrador_entrada,fecha ) VALUES ($1,$2,$3,$4, $5) RETURNING *`;
            const values = [matricula_id,hora_llegada, tardanza,registrador_entrada,fecha];
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
        console.log(updateEntradaAsistenciaDto)
        const pool = PostgresDatabase.getPool();
        try {
            const query = `select 
            tbl_asistencia.id,
            tbl_asistencia.hora_entrada,
            tbl_asistencia.hora_salida,
            tbl_asistencia.registrador_entrada,
            tbl_asistencia.registrador_salida,
            tbl_asistencia.fecha
            from tbl_alumno alu inner join tbl_matricula
            on tbl_alumno.id = tbl_matricula.alumno_id inner join tbl_asistencia
            on tbl_matricula.id = tbl_asistencia.matricula_id
            where alu.codigo_id = $1 AND DATE(tbl_asistencia.fecha) = CURRENT_DATE`;

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

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async registerSalida(codigo:string,updateSalidaAsistenciaDto:UpdateSalidaAsistenciaDto):Promise<AsistenciaEntityOu>{
        const { hora_salida, hora_llegada,registrador_salida, fecha} = updateSalidaAsistenciaDto;
        const pool = PostgresDatabase.getPool();
        try {

            const query = `select 
            asi.id,
            mat.id as matricula_id,
            asi.hora_entrada,
            asi.hora_salida,
            asi.registrador_entrada,
            asi.registrador_salida,
            asi.fecha
            from tbl_alumno alu inner join tbl_matricula mat
            on alu.id = mat.alumno_id inner join tbl_asistencia asi
            on mat.id = asi.matricula_id
            where alu.codigo_id = $1 AND asi.fecha = $2`;

            const values = [codigo, fecha];
            console.log(values)
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            console.log(result.rows)
            
            if(result.rows.length===0){ return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:'No se registro asistencia hoy'});}

            if(result.rows[0].hora_entrada===null){ return AsistenciaMapper.AsistenciaEntityFromObject({ok:false, message:'Primero debe marcar asistencia'}); }



            if(result.rows[0].hora_salida===null){
                const salidaDate = new Date(`${fecha}T${hora_salida}Z`);
                const llegadaDate = new Date(`${fecha}T${hora_llegada}Z`);
                const diffMin = (llegadaDate.getTime() - salidaDate.getTime()) / (1000 * 60);

                if (diffMin < 0) {return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:"Debe esperar hasta la hora de salida"}); }
                if (diffMin > 60) { return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:"Solo puede marcar hasta 1 hora despues"}); }

                const query1 = `update tbl_asistencia set hora_salida=$1, registrador_salida=$2 where id=$3 RETURNING *`;
                const values1 = [hora_llegada,registrador_salida,result.rows[0].id];

                const result1:any = await pool.query(query1, values1); 
                await pool.query('COMMIT'); 
                if(result1.rowCount>0){
                    return AsistenciaMapper.AsistenciaEntityFromObject({ok:true, data:result1.rows[0],message:'Operación exitosa'});
                } else {
                    return AsistenciaMapper.AsistenciaEntityFromObject({ok:false,message:'No se actualiazo'});
                }             
            }else {
                return AsistenciaMapper.AsistenciaEntityFromObject({ok:false, message:'Ya se marco la salida'});
            }

        } catch (error) {
            console.log('SALIDA::',error)
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

    async findAll():Promise<AsistenciaEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_asistencia where estado = true");

            if(result){
                return AsistenciaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AsistenciaMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterClaseLectiva(filterClaseAsistenciaDto: FilterClaseAsistenciaDto): Promise<AsistenciaEntityOu> {
        try {
            const { codigo, fecha} = filterClaseAsistenciaDto;
            console.log(filterClaseAsistenciaDto)

            const pool = PostgresDatabase.getPool();
            const query = `SELECT 
            alu.id as alumno_id,
            mat.id as matricula_id,
            pro.id as clase_id,
            lec.id as lectivo_id,
            mat.turno,
            pro.fecha,
            pro.hora_entrada,
            pro.hora_salida,
            lec.anio
            FROM tbl_matricula mat INNER JOIN tbl_alumno alu
            on mat.alumno_id=alu.id INNER JOIN tbl_anio_lectivo lec
            ON mat.anio_lectivo_id=lec.id INNER JOIN tbl_colegio col
            ON lec.colegio_id = col.id INNER JOIN tbl_clase_programada pro
            ON pro.matricula_id = mat.id 
            WHERE alu.codigo_id=$1 and pro.fecha=$2`;
            const values = [codigo, fecha]

            await pool.query('BEGIN'); 
            const result:any = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result){
                // console.log(result)
                if(result.rowCount!=0){
                    return AsistenciaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
                }
                return AsistenciaMapper.findEntityFromObject({ok:false, data:result.rows,message:'Sin datos'})
            }
            return AsistenciaMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            // console.log(error)
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    




}