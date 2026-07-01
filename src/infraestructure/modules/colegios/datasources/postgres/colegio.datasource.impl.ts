// import { ColegioDatasource, ColegioEntityOu, RegisterColegioDto } from "../../../../../domain/modulos/colegio/index.js";
import { CustomError, ColegioDatasource, ColegioEntityOu, RegisterColegioDto, ColegioNivelEntityOu  } from "../../../../../domain/index.js";
import { UpdateColegioDto } from "../../../../../domain/modules/colegios/dtos/update.colegio.dto.js";
import { PostgresConnection } from "../../../../database/index.js";

import { ColegioMapper } from "../../mappers/colegio.mapper.js";
import { ColegioNivelMapper } from "../../mappers/colegio.nivel.mapper.js";
// import { PostgresDatabase } from "../../../../../data/postgres/index.js";

export class ColegioDatasourceImpl implements ColegioDatasource { 

    async register(registerColegioDto: RegisterColegioDto,by:string): Promise<ColegioEntityOu>{
        const { nombre, correo, telefono, direccion, estado } = registerColegioDto;
        const pool = PostgresConnection.getPool();
        try {
            const values = [nombre, correo, telefono, direccion, estado, by ];
            const query = `SELECT insertar_colegio (p_nom:=$1, p_cor:=$2, p_tel:=$3, p_dir:=$4, p_est:=$5,p_by:=$6) AS response`;

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return ColegioMapper.colegioEntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message, 
                    data:result.rows[0].response.data
                });
            }

            return ColegioMapper.colegioEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findById(id:string):Promise<ColegioEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            // const numericId = Number(id);
            // if (isNaN(numericId)) {
            //     return ColegioMapper.colegioEntityFromObject({ok:false,message:'No encontrado'});
            // }

            const result = await pool.query("SELECT * FROM v_list_colegio WHERE id_colegio = $1", [id]);
            if(result.rows.length>0){
                return ColegioMapper.colegioEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }else {
                return ColegioMapper.colegioEntityFromObject({ok:false, message:'No encontrado'});
            }
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll(page:number, limit:number):Promise<ColegioEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const result = await pool.query("SELECT * FROM v_list_colegio AS response");

            if(result){
                return ColegioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ColegioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive(page: number, limit: number): Promise<ColegioEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const result = await pool.query("SELECT * FROM v_list_colegio AS response WHERE estado = true");
            if(result){
                return ColegioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ColegioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch(error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findOne(id: string): Promise<ColegioEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_colegio WHERE id_colegio = $1 AND estado=true", [id]);
            if(result.rows.length>0){
                return ColegioMapper.findEntityFromObject({
                    ok:true,
                    data:result.rows,
                    message:'Operación exitosa'});
            }

            return ColegioMapper.findEntityFromObject({ok:false,message:'Error'});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateAll(updateColegioDto: UpdateColegioDto, by: string): Promise<ColegioEntityOu> {
        const { id_colegio, nombre, correo, direccion, telefono, estado } = updateColegioDto;
        try {
            const pool = PostgresConnection.getPool();

            // Construir dinámicamente los campos y valores
            const fields = [
                { key: 'p_id_colegio', value: id_colegio },
                { key: 'p_nom', value: nombre },
                { key: 'p_cor', value: correo },
                { key: 'p_dir', value: direccion },
                { key: 'p_tel', value: telefono },
                { key: 'p_est', value: estado },
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
            const query = `SELECT update_colegio(${paramNames}) AS response`;
            const values = filteredFields.map(f => f.value);

            const result = await pool.query(query, values);

            if(result){
                return ColegioMapper.findEntityFromObject({ok:result.rows[0].response.ok, message:result.rows[0].response.message});
            }
            return ColegioMapper.findEntityFromObject({ok:false,message:'Error'});

        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}