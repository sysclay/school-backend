
import { CustomError, GradoDatasource, GradoEntityOu, RegisterGradoDto, UpdateGradoDto } from "../../../../../domain/index.js";
import { GradoMapper } from "../../mappers/grado.mapper.js";
//import { GradoModel } from "../../../data/mongodb/models/tipo.documento.model";

// import { PostgresDatabase } from "../../../../../data/postgres/index.js";
import { PostgresConnection } from "../../../../database/index.js";

export class GradoDatasourceImpl implements GradoDatasource { 

    async register(registerGradoDto: RegisterGradoDto,by:string): Promise<GradoEntityOu>{
        const { codigo, nombre, abreviado, descripcion, id_nivel} = registerGradoDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `SELECT insertar_grado (p_cod:=$1, p_nom:=$2, p_abr:=$3, p_desc:=$4, p_id_nivel:=$5 ) AS response`;
            const values = [ codigo, nombre, abreviado, descripcion, id_nivel];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return GradoMapper.gradoEntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message, 
                    data:result.rows[0].response.data
                });
            }

            return GradoMapper.gradoEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findById(id:string):Promise<GradoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const numericId = Number(id);
            if (isNaN(numericId)) {
                return GradoMapper.gradoEntityFromObject({ok:false,message:'No encontrado'});
            }

            const result = await pool.query("SELECT * FROM v_list_grado WHERE id_grado = $1", [id]);
            return GradoMapper.gradoEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }  

    async findAll():Promise<GradoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_grado AS response");
   
            if(result){
                return GradoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return GradoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateAll(id:string,updateGradoDto:UpdateGradoDto,by:string):Promise<GradoEntityOu>{

        const { codigo, nombre, abreviado, descripcion, estado} = updateGradoDto;
        try {

            const pool = PostgresConnection.getPool();
            const fields = [
                { key: 'p_id', value: id },
                { key: 'p_nom', value: nombre },
                { key: 'p_abr', value: abreviado },
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
            const query = `SELECT update_grado(${paramNames}) AS response`;
            const values = filteredFields.map(f => f.value);
            const result = await pool.query(query, values);

            if(result){
                return GradoMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return GradoMapper.findEntityFromObject({ok:false,message:'Error'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            } 
            throw CustomError.internalServer();
        }

    }

}