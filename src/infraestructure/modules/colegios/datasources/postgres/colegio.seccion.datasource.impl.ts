// import { ColegioSeccionDatasource, ColegioSeccionEntityOu, RegisterColegioSeccionDto } from "../../../../../domain/modulos/ColegioSeccion/index.js";
import { CustomError, ColegioSeccionDatasource, RegisterColegioSeccionDto, ColegioSeccionEntityOu, UpdateColegioSeccionDto, FilterColegioSeccionDto  } from "../../../../../domain/index.js";
import { PostgresConnection } from "../../../../database/index.js";

import { ColegioSeccionMapper } from "../../mappers/colegio.seccion.mapper.js";
// import { PostgresDatabase } from "../../../../../data/postgres/index.js";

export class ColegioSeccionDatasourceImpl implements ColegioSeccionDatasource { 

    async register(registerColegioSeccionDto: RegisterColegioSeccionDto, by:string): Promise<ColegioSeccionEntityOu>{
        const { id_colegio, id_nivel, id_grado, id_seccion} = registerColegioSeccionDto;
        const pool = PostgresConnection.getPool();
        await pool.query('BEGIN'); 
        try {

            const query = `SELECT insertar_colegio_seccion(p_id_colegio:=$1,p_id_nivel:=$2,p_id_grado:=$3,p_id_seccion:=$4,p_by:=$5) AS response`;
            const values = [id_colegio, id_nivel, id_grado, id_seccion,by];

            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return ColegioSeccionMapper.colegioSeccionEntityFromObject({
                    ok:result.rows[0].response.ok, 
                    message:result.rows[0].response.message
                });
            }

            return ColegioSeccionMapper.colegioSeccionEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findByIdColegio(id:string, estado?:boolean):Promise<ColegioSeccionEntityOu>{
        try {
            const pool = PostgresConnection.getPool();

            let query = 'SELECT * FROM v_list_colegio_seccion WHERE id_colegio = $1';
            const values: any[] = [id];

            // Si estado es true, filtrar solo activos
            if (estado) {
                query += ' AND estado = $2';
                values.push(true);
            }
            query += ' ORDER BY nivel ASC, grado ASC, seccion ASC';

            const result = await pool.query(query, values);
            
            if(result.rows.length>0){
                return ColegioSeccionMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'});
            }else {
                return ColegioSeccionMapper.findEntityFromObject({ok:false, message:'No encontrado'});
            }
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll(page:number, limit:number):Promise<ColegioSeccionEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const result = await pool.query("SELECT * FROM v_list_colegio_seccion AS response");

            if(result){
                return ColegioSeccionMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ColegioSeccionMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filter(FilterColegioSeccionDto:FilterColegioSeccionDto):Promise<ColegioSeccionEntityOu>{
        try {
            const { id_colegio, id_nivel, id_grado } = FilterColegioSeccionDto;
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
            if (id_grado) {
                values.push(id_grado);
                conditions.push(`id_grado = $${values.length}`);
            }

            const whereClause = conditions.length? `WHERE ${conditions.join(' AND ')}`: '';

            const dataQuery = `SELECT * FROM v_list_colegio_seccion AS response ${whereClause}`;

            const [result] = await Promise.all([
                pool.query(dataQuery, values)
            ]);

            if(result){
                return ColegioSeccionMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ColegioSeccionMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


    async updateIsActive(updateColegioSeccionDto:UpdateColegioSeccionDto,by:string):Promise<ColegioSeccionEntityOu>{

        const { id_colegio, id_nivel, id_grado, id_seccion, estado}= updateColegioSeccionDto;
        try {
            const pool = PostgresConnection.getPool();

            const query = `SELECT update_colegio_seccion(p_id_colegio:=$1,p_id_nivel:=$2,p_id_grado:=$3, p_id_seccion:=$4, p_estado:=$5) AS response`;
            const values = [id_colegio, id_nivel, id_grado,id_seccion, estado];

            const result = await pool.query(query, values); 

            if(result){
                return ColegioSeccionMapper.findEntityFromObject({ok:result.rows[0].response.ok, message:result.rows[0].response.message});
            }
            return ColegioSeccionMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}