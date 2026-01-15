// import { ColegioNivelDatasource, ColegioNivelEntityOu, RegisterColegioNivelDto } from "../../../../../domain/modulos/ColegioNivel/index.js";
import { CustomError, ColegioNivelDatasource, RegisterColegioNivelDto, ColegioNivelEntityOu, UpdateColegioNivelDto, FilterColegioNivelDto  } from "../../../../../domain/index.js";
import { PostgresConnection } from "../../../../database/index.js";

import { ColegioNivelMapper } from "../../mappers/colegio.nivel.mapper.js";
// import { PostgresDatabase } from "../../../../../data/postgres/index.js";

export class ColegioNivelDatasourceImpl implements ColegioNivelDatasource { 

    async register(registerColegioNivelDto: RegisterColegioNivelDto,by:string): Promise<ColegioNivelEntityOu>{
        const { id_colegio, id_nivel} = registerColegioNivelDto;
        const pool = PostgresConnection.getPool();
        try {

            const query = `SELECT insertar_colegio_nivel (p_id_colegio:=$1,p_id_nivel:=$2,p_by:=$3) AS response`;
            const values = [id_colegio, id_nivel,by];
            console.log(values)
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            console.log(result)
            if(result.rows.length>0){
                // if(result.rows[0].response.ok){
                //     return ColegioNivelMapper.colegioNivelEntityFromObject({
                //         ok:result.rows[0].response.ok,
                //         message:result.rows[0].response.message, 
                //         data:result.rows[0].response.data
                //     });
                // }
                return ColegioNivelMapper.colegioNivelEntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message,
                });
            }

            return ColegioNivelMapper.colegioNivelEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            console.log(error)
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findByIdColegio(id:string):Promise<ColegioNivelEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_colegio_nivel WHERE id_colegio = $1 ORDER BY nivel ", [id]);
            if(result.rows.length>0){
                return ColegioNivelMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'});
            }else {
                return ColegioNivelMapper.findEntityFromObject({ok:false,message:'No encontrado'});
            }
            
        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    } 

    async findAll(page:number, limit:number):Promise<ColegioNivelEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const result = await pool.query("SELECT * FROM v_list_colegio_nivel AS response");

            if(result){
                return ColegioNivelMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ColegioNivelMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filter(filterColegioNivelDto:FilterColegioNivelDto):Promise<ColegioNivelEntityOu>{
        try {
            const { id_colegio } = filterColegioNivelDto;
            const pool = PostgresConnection.getPool();
            const conditions: string[] = [];
            const values: any[] = [];
            if (id_colegio) {
                values.push(id_colegio);
                conditions.push(`id_colegio = $${values.length}`);
            }
            
            const whereClause = conditions.length? `WHERE ${conditions.join(' AND ')}`: '';

            const dataQuery = `SELECT * FROM v_list_colegio_nivel AS response ${whereClause}`;

            const [result] = await Promise.all([
                pool.query(dataQuery, values)
            ]);

            if(result){
                return ColegioNivelMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ColegioNivelMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateIsActive(updateColegioNivelDto:UpdateColegioNivelDto,by:string):Promise<ColegioNivelEntityOu>{

        const { id_colegio, id_nivel, estado}= updateColegioNivelDto;
        try {
            const pool = PostgresConnection.getPool();

            const query = `SELECT update_colegio_nivel(p_id_colegio:=$1,p_id_nivel:=$2,p_estado:=$3) AS response`;
            const values = [id_colegio, id_nivel, estado];

            const result = await pool.query(query, values); 

            if(result){
                return ColegioNivelMapper.findEntityFromObject({ok:result.rows[0].response.ok, message:result.rows[0].response.message});
            }
            return ColegioNivelMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}