
import { CustomError, AcademicoDatasource, AcademicoEntityOu, RegisterAcademicoDto } from "../../../../../domain/index.js";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
import { AcademicoMapper } from "../../mappers/academico.mapper.js";

export class AcademicoDatasourceImpl implements AcademicoDatasource { 


    async register(registerAcademicoDto: RegisterAcademicoDto, by: string): Promise<AcademicoEntityOu> {
        const { nombre, descripcion} = registerAcademicoDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `SELECT insertar_anio_academico (p_nom:=$1, p_des:=$2, p_by:=$3 ) AS response`;
            const values = [ nombre,descripcion,by];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return AcademicoMapper.EntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message,
                    data:result.rows[0].response.data,
                });
            }

            return AcademicoMapper.EntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<AcademicoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_anio_academico AS response ORDER BY nombre desc");
            // console.log(result)
            if(result){
                return AcademicoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AcademicoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive():Promise<AcademicoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_anio_academico AS response WHERE estado=true ORDER BY nombre desc");

            if(result){
                return AcademicoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AcademicoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActiveActual():Promise<AcademicoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_anio_academico AS response WHERE estado=true AND nombre=EXTRACT(YEAR FROM CURRENT_DATE)::TEXT ");

            if(result){
                return AcademicoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AcademicoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    // async findById(id: string): Promise<AsignadoEntityOu> {
    //     try {
    //         const pool = PostgresConnection.getPool();
    //         const query = `SELECT 
    //                     id_asignado,
    //                     asignado
    //                     FROM v_list_roles_asignados
    //                     WHERE estado=true AND id_asigna=$1`;
    //         const values = [id];

    //         await pool.query('BEGIN'); 
    //         const result = await pool.query(query, values); 
    //         await pool.query('COMMIT'); 

    //         if(result){
    //             return AsignadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
    //         }
    //         return AsignadoMapper.findEntityFromObject({ok:false,message:'Error'})

            
    //     } catch (error) {
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }

}