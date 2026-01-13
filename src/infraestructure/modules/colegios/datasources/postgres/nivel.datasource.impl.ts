import { CustomError, NivelDatasource, NivelEntityOu, RegisterNivelDto, UpdateNivelDto } from "../../../../../domain/index.js";
import { NivelMapper } from "../../mappers/nivel.mapper.js";
//import { NivelModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresConnection } from "../../../../database/postgres/index.js";
// import { PostgresDatabase } from "../../../../../data/postgres/index.js";

export class NivelDatasourceImpl implements NivelDatasource { 

    async register(registerNivelDto: RegisterNivelDto): Promise<NivelEntityOu>{
        const { codigo, nombre, descripcion } = registerNivelDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `SELECT insertar_nivel (p_cod:=$1,p_nom:=$2, p_desc:=$3 ) AS response`;
            const values = [ codigo, nombre, descripcion];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return NivelMapper.nivelEntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message, 
                    data:result.rows[0].response.data
                });
            }

            return NivelMapper.nivelEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '22P02') {
                throw CustomError.badRequest(`La sintaxis no es valida`);
            }
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findById(id:string):Promise<NivelEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const numericId = Number(id);
            console.log(numericId)
            if (isNaN(numericId)) {
                return NivelMapper.nivelEntityFromObject({ok:false,message:'No encontrado'});
            }

            const result = await pool.query("SELECT * FROM v_list_nivel WHERE id_nivel = $1", [id]);
            return NivelMapper.nivelEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }   


    async findAll():Promise<NivelEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_nivel;");
            if(result){
                return NivelMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return NivelMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive():Promise<NivelEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_nivel AS v WHERE v.estado=true;");
            if(result){
                return NivelMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return NivelMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


    async updateAll(id:string,updateNivelDto:UpdateNivelDto,by:string):Promise<NivelEntityOu>{

        const { nombre,descripcion,estado} = updateNivelDto;
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

            const query = `SELECT update_nivel(${paramNames}) AS response`;
            const values = filteredFields.map(f => f.value);
            const result = await pool.query(query, values);

            if(result){
                return NivelMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return NivelMapper.findEntityFromObject({ok:false,message:'Error'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            } 
            throw CustomError.internalServer();
        }

    }

}