
import { CustomError, AcademicoColegioDatasource, AcademicoColegioEntityOu, RegisterAcademicoColegioDto, FilterAcademicoColegioDto } from "../../../../../domain/index.js";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
import { AcademicoColegioMapper } from "../../mappers/academico.colegio.mapper.js";
export class AcademicoColegioDatasourceImpl implements AcademicoColegioDatasource { 


    async register(registerAcademicoColegioDto: RegisterAcademicoColegioDto, by: string): Promise<AcademicoColegioEntityOu> {
        const { id_colegio, id_academico, fecha_inicio, fecha_fin } = registerAcademicoColegioDto;
        const pool = PostgresConnection.getPool();
        try {
            const query = `SELECT insertar_anio_academico_colegio(p_id_colegio:=$1,p_id_academico:=$2,p_fec_ini:=$3,p_fec_fin:=$4,p_by:=$5) AS response`;
            const values = [ id_colegio, id_academico, fecha_inicio, fecha_fin, by ];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values);
            await pool.query('COMMIT');

            if(result.rows.length>0){
                return AcademicoColegioMapper.EntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message
                });
            }

            return AcademicoColegioMapper.EntityFromObject({ok:false,message:'Error'});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<AcademicoColegioEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_anios_academicos_colegios AS response");
            console.log(result)
            if(result){
                return AcademicoColegioMapper.findEntityFromObject({ ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AcademicoColegioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


    async findAllActive(page: number, limit: number): Promise<AcademicoColegioEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const result = await pool.query("SELECT * FROM v_list_anios_academicos_colegios AS response WHERE estado = true");
            
            if(result){
                return AcademicoColegioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AcademicoColegioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch(error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
    
    async filter(filterAcademicoColegioDto: FilterAcademicoColegioDto): Promise<AcademicoColegioEntityOu> {
        try {
            const { id_academico, id_colegio } = filterAcademicoColegioDto;
            const pool = PostgresConnection.getPool();
            const conditions: string[] = [];
            const values: any[] = [];
            if (id_colegio) {
                values.push(id_colegio);
                conditions.push(`id_colegio = $${values.length}`);
            }
            if (id_academico) {
                values.push(id_academico);
                conditions.push(`id_academico = $${values.length}`);
            }

            const query = `SELECT * FROM v_list_anios_academicos_colegios WHERE ${conditions.join(' AND ')}`;
            const result = await pool.query(query, values);

            // console.log(result.rows)

            if(result.rows.length>0){
                return AcademicoColegioMapper.findEntityFromObject({
                    ok:true,
                    data:result.rows,
                    message:'Operación exitosa'});
            }
            return AcademicoColegioMapper.findEntityFromObject({ok:false,message:'Sin datos', data:[]});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


    async findById(id: string): Promise<AcademicoColegioEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT * FROM v_list_anios_academicos_colegios WHERE id_academico_colegio=$1 AND estado=true`;
            const values = [id];

            console.log('O::',id)
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');

            if(result.rows.length>0){
                // console.log('2222',result.rows)
                return AcademicoColegioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AcademicoColegioMapper.findEntityFromObject({ok:false,message:'Error'})
            
        } catch (error) {
            // console.log(error)
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}