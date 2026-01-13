
import { CustomError, ApoderadoAlumnoDatasource, ApoderadoAlumnoEntityOu, RegisterApoderadoAlumnoDto, FilterApoderadoAlumnoDto } from "../../../../../domain/index.js";
import { ApoderadoAlumnoMapper } from "../../mappers/apoderado.alumno.mapper.js";

import { Validators } from "../../../../../utils/validators.js";
import { PostgresConnection } from "../../../../database/index.js";
export class ApoderadoAlumnoDatasourceImpl implements ApoderadoAlumnoDatasource { 

    async register(registerApoderadoAlumnoDto: RegisterApoderadoAlumnoDto, by:string): Promise<ApoderadoAlumnoEntityOu>{
        const { id_apoderado,id_alumno, id_parentesco } = registerApoderadoAlumnoDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const fields = [
                { key: 'p_id_apo', value: id_apoderado},
                { key: 'p_id_alu', value: id_alumno},
                { key: 'p_id_par', value: id_parentesco},
                { key: 'p_by', value: by},
            ];
            // Filtrar solo los campos que no son null ni undefined
            const filteredFields = fields.filter(f => f.value !== undefined && f.value !== null && f.value !== '');
            const paramPlaceholders = filteredFields.map((_, idx) => `$${idx + 1}`);
            const paramNames = filteredFields.map(f => `${f.key}:=${paramPlaceholders.shift()}`).join(', ');
            const values = filteredFields.map(f => f.value);

            const query = `SELECT insertar_apoderado_alumno(${paramNames}) AS response`;

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
            // if(true) {
                if(result.rows[0].response.ok){
                    return ApoderadoAlumnoMapper.apoderadoalumnoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
                } 
                return ApoderadoAlumnoMapper.apoderadoalumnoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return ApoderadoAlumnoMapper.apoderadoalumnoEntityFromObject({ok:false,message:'No se inserto'});
            
        } catch (error:any) {
            await pool.query('ROLLBACK');
            console.log('here::',error)
            if(error instanceof CustomError){ throw error;}
            throw CustomError.internalServer();
        }
    }

    async findAllApoderado(id_apoderado:string):Promise<ApoderadoAlumnoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT*FROM v_list_apoderado_alumnos WHERE id_apoderado=$1`
            const values = [id_apoderado]

            const result = await pool.query(query,values);

            if(result){
                return ApoderadoAlumnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ApoderadoAlumnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterAll(FilterApoderadoAlumnoDto:FilterApoderadoAlumnoDto):Promise<ApoderadoAlumnoEntityOu>{
        try {

            const { id_persona} = FilterApoderadoAlumnoDto;
            // console.log('aa',FilterApoderadoAlumnoDto)

            const pool = PostgresConnection.getPool();
            const query = `SELECT*FROM v_list_apoderado_alumnos WHERE id_persona=$1`
            const values = [id_persona]
            const result = await pool.query(query,values);
            // console.log(result)
            if(result){
                return ApoderadoAlumnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ApoderadoAlumnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}