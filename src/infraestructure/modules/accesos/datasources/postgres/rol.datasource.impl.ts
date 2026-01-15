
import { CustomError,RolDatasource,RolEntityOu, RegisterRolDto } from "../../../../../domain/index.js";
import { RolMapper } from "../../mappers/rol.mapper.js";
//import {RolModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
// import { RolAsignadoMapper } from "../../mappers/rol.asignado.mapper.js";

export class RolDatasourceImpl implements RolDatasource { 

    async register(registerRolDto: RegisterRolDto, by:string): Promise<RolEntityOu>{
        const { codigo, nombre,descripcion} = registerRolDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `INSERT INTO tbl_roles (cod_rol, nom_rol, descripcion, created_by ) VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [codigo, nombre,descripcion, by];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return RolMapper.EntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return RolMapper.EntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            console.log('error',error)
            
            if (error.code === '23505') {
                if (error.constraint === 'tbl_rol_usuario_pkey') {
                    throw CustomError.badRequest(`El rol y usuario ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_rol_usuario_usuario_id_fkey') {
                    throw CustomError.badRequest(`El usuario no existe`);
                }

                if (error.constraint === 'tbl_rol_usuario_rol_id_fkey') {
                    throw CustomError.badRequest(`El rol no existe`);
                }
            }

            if (error.code === '22P02') {
                throw CustomError.badRequest(`La sintaxis no es valida`);
            }

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    // async filterAll(filterRolDto:FilterRolDto):Promise<RolEntityOu>{
    //     try {
    //         const { usuario_id } = filterRolDto;

    //         const pool = PostgresConnection.getPool();
    //         const query = "SELECT * FROM obtener_roles_por_usuario($1)";
    //         const values = [usuario_id];

    //         await pool.query('BEGIN'); 
    //         const result = await pool.query(query, values); 
    //         await pool.query('COMMIT'); 
    
    //         if(result.rowCount!=0){
    //             const roles = result.rows.length==0?[]:result.rows.map((r)=> { return { rol:r.rol} } );
    //             return RolMapper.findEntityFromObject({ok:true, data:roles,message:'Operación exitosa'})
    //         }else {
    //             return RolMapper.findEntityFromObject({ok:false,data:result.rows,message:'Sin datos'})
    //         }
    //     } catch (error) {
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }



    async findAll():Promise<RolEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_roles AS response");
  
            if(result){
                return RolMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return RolMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    // async asignado(id:string):Promise<RolEntityOu>{
    //     try {
    //         // const { usuario_id } = filterRolDto;
    //         const pool = PostgresConnection.getPool();
    //         const query = "SELECT*FROM list_roles_asignados(p_codigo:=$1);";
    //         const values = [id];
    //         await pool.query('BEGIN'); 
    //         const result = await pool.query(query, values); 
    //         await pool.query('COMMIT'); 
    
    //         if(result.rowCount!=0){
    //             const roles = result.rows.length==0?[]:result.rows.map((r)=> { return { id_rol:r.codigo ,nombre_rol:r.nombre_rol, estado:r.estado} } );
    //             return RolMapper.findEntityFromObject({ok:true, data:roles,message:'Operación exitosa'})
    //         }else {
    //             return RolMapper.findEntityFromObject({ok:false,message:'Operación no exitosa'})
    //         }
    //     } catch (error) {
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }

    // async registerRolPersonaColegio(registerRolPersonaColegioDto:RegisterRolPersonaColegioDto,by:string):Promise<RolEntityOu>{
    //     try {

    //         const { id_rol,id_persona,id_colegio} = registerRolPersonaColegioDto;


    //         const pool = PostgresConnection.getPool();
    //         const query = `SELECT*FROM insertar_prc(p_id_rol:=$1,p_id_persona:=$2,p_id_colegio:=$3,p_created_by:=$4) as response;`;
    //         const values = [id_rol,id_persona,id_colegio,by];
    //         await pool.query('BEGIN'); 
    //         const result = await pool.query(query, values); 
    //         await pool.query('COMMIT'); 
    //         console.log(result)
    
    //         if(result.rowCount!=0){
    //             if(result.rows[0].ok){
    //                 return RolMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message})
    //             }

    //             // const roles = result.rows.length==0?[]:result.rows.map((r)=> { return { id_rol:r.codigo ,nombre_rol:r.nombre_rol, estado:r.estado} } );
    //             return RolMapper.findEntityFromObject({ok:result.rows[0].response.ok, message:result.rows[0].response.message})
    //         }else {
    //             return RolMapper.findEntityFromObject({ok:false,message:'Operación no exitosa'})
    //         }

    //     } catch (error) {
    //         console.log('ee',error)
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }


    // async asignarRolPermisoModulo(asignarRolPermisoModuloDto:AsignarRolPermisoModuloDto,by:string):Promise<RolEntityOu>{

    //     const { id_rol, id_permiso, id_tabla, estado} = asignarRolPermisoModuloDto;
    //     try {
    //         const pool = PostgresConnection.getPool();
    //         const query = `SELECT*FROM asignar_permiso_rol_modulo(p_id_rol:=$1,p_id_permiso:=$2,p_id_tabla:=$3,p_estado:=$4) as response;`;
    //         const values = [id_rol,id_permiso,id_tabla,estado];

    //         await pool.query('BEGIN'); 
    //         const result = await pool.query(query, values); 
    //         await pool.query('COMMIT'); 
    //         if(result){
    //             console.log(result.rows[0].response)
    //             if(result.rows[0].response.ok){
    //                 return RolMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message})
    //             }
    //             return RolMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message})
    //         }
    //         return RolMapper.findEntityFromObject({ok:false,message:'Error'})
    //     } catch (error) {
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }
}