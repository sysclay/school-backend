import { CustomError, SeccionDatasource, SeccionEntityOu, RegisterSeccionDto, UpdateSeccionDto } from "../../../../../domain/index.js";
import { SeccionMapper } from "../../mappers/seccion.mapper.js";
//import { SeccionModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresConnection } from "../../../../database/postgres/index.js";
// import { PostgresDatabase } from "../../../../../data/postgres/index.js";

export class SeccionDatasourceImpl implements SeccionDatasource { 

    async register(registerSeccionDto: RegisterSeccionDto,by:string): Promise<SeccionEntityOu>{
        const { nombre, descripcion,id_grado } = registerSeccionDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `SELECT insertar_seccion (p_nom:=$1, p_desc:=$2, p_id_grado:=$3 ) AS response`;
            const values = [nombre, descripcion,id_grado];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return SeccionMapper.SeccionEntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message, 
                    data:result.rows[0].response.data
                });
            }

            return SeccionMapper.SeccionEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                if (error.constraint === 'tbl_seccion_seccion_grado_id_key') {
                    throw CustomError.badRequest(`El grado y seccion ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_seccion_grado_id_fkey') {
                    throw CustomError.badRequest(`El grado no existe`);
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


    async findAll():Promise<SeccionEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_seccion AS response");

            if(result){
                return SeccionMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return SeccionMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateAll(id:string,updateSeccionDto:UpdateSeccionDto,by:string):Promise<SeccionEntityOu>{

        const { nombre, descripcion, estado} = updateSeccionDto;
        try {

            const pool = PostgresConnection.getPool();
            const fields = [
                { key: 'p_id', value: id },
                { key: 'p_nom', value: nombre },
                { key: 'p_desc', value: descripcion },
                { key: 'p_estado', value: estado },
            ];
            // Filtro robusto: excluye undefined, null, NaN, string vacío o solo espacios
            const isValidValue = (v: unknown) =>
                v !== undefined &&
                v !== null &&
                !(typeof v === 'number' && isNaN(v)) &&
                !(typeof v === 'string' && v.trim() === '');

            const filteredFields = fields.filter(f => isValidValue(f.value));

            const paramPlaceholders = filteredFields.map((_, idx) => `$${idx + 1}`);
            const paramNames = filteredFields.map(f => `${f.key}:=${paramPlaceholders.shift()}`).join(',');

            const query = `SELECT update_seccion(${paramNames}) AS response`;
            const values = filteredFields.map(f => f.value);
            const result = await pool.query(query, values);
            if(result){
                return SeccionMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return SeccionMapper.findEntityFromObject({ok:false,message:'Error'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            } 
            throw CustomError.internalServer();
        }

    }

}