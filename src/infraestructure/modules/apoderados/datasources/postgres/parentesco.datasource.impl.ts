
import { CustomError, ParentescoDatasource, ParentescoEntityOu, RegisterParentescoDto } from "../../../../../domain/index.js";
import { ParentescoMapper } from "../../mappers/parentesco.mapper.js";

// import { PostgresDatabase } from "../../../../../data/postgres/index.js";
import { QR } from "../../../../../config/index.js";
import { Validators } from "../../../../../utils/validators.js";
import { PostgresConnection } from "../../../../database/index.js";
export class ParentescoDatasourceImpl implements ParentescoDatasource { 

    async register(registerParentescoDto: RegisterParentescoDto, by:string): Promise<ParentescoEntityOu>{
        const { cod_parentesco,nom_parentesco} = registerParentescoDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const fields = [
                { key: 'p_cod', value: cod_parentesco ? Validators.capitalizar(cod_parentesco) : undefined},
                { key: 'p_nom', value: nom_parentesco ? Validators.capitalizar(nom_parentesco) : undefined },
            ];
            // Filtrar solo los campos que no son null ni undefined
            const filteredFields = fields.filter(f => f.value !== undefined && f.value !== null && f.value !== '');
            const paramPlaceholders = filteredFields.map((_, idx) => `$${idx + 1}`);
            const paramNames = filteredFields.map(f => `${f.key}:=${paramPlaceholders.shift()}`).join(', ');
            const values = filteredFields.map(f => f.value);

            const query = `SELECT insertar_parentesco(${paramNames}) AS response`;

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                if(result.rows[0].response.ok){
                    return ParentescoMapper.parentescoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
                } 
                return ParentescoMapper.parentescoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return ParentescoMapper.parentescoEntityFromObject({ok:false,message:'No se inserto'});
            
        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){ throw error;}
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<ParentescoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const queryS = `SELECT*FROM v_list_parentesco`
            const result = await pool.query(queryS);

            if(result){
                return ParentescoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ParentescoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive():Promise<ParentescoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const queryS = `SELECT*FROM v_list_parentesco WHERE estado=true`
            const result = await pool.query(queryS);

            if(result){
                return ParentescoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ParentescoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}