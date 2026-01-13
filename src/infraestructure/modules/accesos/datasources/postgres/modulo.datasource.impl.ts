import { CustomError, ModuloDatasource, ModuloEntityOu, RegisterModuloDto, UpdateModuloDto } from "../../../../../domain/index.js";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
import { ModuloMapper } from "../../mappers/modulo.mapper.js";

export class ModuloDatasourceImpl implements ModuloDatasource { 


    async register(registerModuloDto: RegisterModuloDto, by:string): Promise<ModuloEntityOu>{
        const { codigo, nombre, descripcion} = registerModuloDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `SELECT insertar_modulo (p_codigo:=$1,p_nombre:=$2,p_descripcion:=$3,p_by:=$4) AS response`;
            const values = [codigo, nombre, descripcion,by];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                return ModuloMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return ModuloMapper.findEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    // LISTAR ModuloSssss
    async findAll():Promise<ModuloEntityOu>{
        try {
            const pool = PostgresConnection.getPool();

            const query = `SELECT*FROM v_list_modulos AS response ORDER BY nombre_modulo `

            await pool.query('BEGIN');
            const result = await pool.query(query);
            await pool.query('COMMIT');

            if(result.rows.length>0){
                return ModuloMapper.findEntityFromObject({ok:true, data:result.rows ,message:'Operación exitosa'}); 
            } 

            return ModuloMapper.findEntityFromObject({ok:false,message:'No encontrado',}); 

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }   
    }


    async updateAll(id:string, updateModuloDto:UpdateModuloDto,by:string):Promise<ModuloEntityOu>{
        const { nombre,descripcion,estado} = updateModuloDto;
        try {

            const pool = PostgresConnection.getPool();
            const fields = [
                { key: 'p_id_modulo', value: id },
                { key: 'p_nombre', value: nombre },
                { key: 'p_descripcion', value: descripcion },
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

            const query = `SELECT update_modulo(${paramNames}) AS response`;
            const values = filteredFields.map(f => f.value);
            const result = await pool.query(query, values);

            if(result){
                return ModuloMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return ModuloMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}