// import { ColegioGradoDatasource, ColegioGradoEntityOu, RegisterColegioGradoDto } from "../../../../../domain/modulos/ColegioGrado/index.js";
import { CustomError, ColegioGradoDatasource, RegisterColegioGradoDto, ColegioGradoEntityOu, UpdateColegioGradoDto, FilterColegioGradoDto  } from "../../../../../domain/index.js";
import { PostgresConnection } from "../../../../database/index.js";

import { ColegioGradoMapper } from "../../mappers/colegio.grado.mapper.js";
// import { PostgresDatabase } from "../../../../../data/postgres/index.js";

export class ColegioGradoDatasourceImpl implements ColegioGradoDatasource { 

    async register(registerColegioGradoDto: RegisterColegioGradoDto, by:string): Promise<ColegioGradoEntityOu>{
        const { id_colegio, id_nivel, id_grado } = registerColegioGradoDto;
        const pool = PostgresConnection.getPool();
        try {

            await pool.query('BEGIN'); 
            const query = `SELECT insertar_colegio_grado(p_id_colegio:=$1,p_id_nivel:=$2,p_id_grado:=$3,p_by:=$4) AS response`;
            const values = [ id_colegio, id_nivel, id_grado, by];

            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                return ColegioGradoMapper.colegioGradoEntityFromObject({
                    ok:result.rows[0].response.ok, 
                    message:result.rows[0].response.message
                });
            }
            return ColegioGradoMapper.colegioGradoEntityFromObject({ok:false,message:'Error'});

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

    async findByIdColegio(id:string):Promise<ColegioGradoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_colegio_grado WHERE id_colegio = $1 ORDER BY nivel ASC, grado ASC", [id]);
            if(result.rows.length>0){
                return ColegioGradoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'});
            }else {
                return ColegioGradoMapper.findEntityFromObject({ok:false, message:'No encontrado'});
            }
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    } 

    async findAll(page:number, limit:number):Promise<ColegioGradoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const result = await pool.query("SELECT * FROM v_list_colegio_grado AS response");

            if(result){
                return ColegioGradoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ColegioGradoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
    async filter(FilterColegioGradoDto:FilterColegioGradoDto):Promise<ColegioGradoEntityOu>{
        try {
            const { id_colegio, id_nivel } = FilterColegioGradoDto;
            const pool = PostgresConnection.getPool();
            const conditions: string[] = [];
            const values: any[] = [];
            if (id_colegio) {
                values.push(id_colegio);
                conditions.push(`id_colegio = $${values.length}`);
            }
            if (id_nivel) {
                values.push(id_nivel);
                conditions.push(`id_nivel = $${values.length}`);
            }
            const whereClause = conditions.length? `WHERE ${conditions.join(' AND ')}`: '';

            const dataQuery = `SELECT * FROM v_list_colegio_grado AS response ${whereClause}`;

            const [result] = await Promise.all([
                pool.query(dataQuery, values)
            ]);

            if(result){
                return ColegioGradoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ColegioGradoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateIsActive(updateColegioGradoDto:UpdateColegioGradoDto,by:string):Promise<ColegioGradoEntityOu>{

        const { id_colegio, id_nivel, id_grado, estado}= updateColegioGradoDto;
        try {
            const pool = PostgresConnection.getPool();

            const query = `SELECT update_colegio_grado(p_id_colegio:=$1,p_id_nivel:=$2,p_id_grado:=$3, p_estado:=$4) AS response`;
            const values = [id_colegio, id_nivel, id_grado, estado];

            const result = await pool.query(query, values); 

            if(result){
                return ColegioGradoMapper.findEntityFromObject({ok:result.rows[0].response.ok, message:result.rows[0].response.message});
            }
            return ColegioGradoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}