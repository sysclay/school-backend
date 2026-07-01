
import { CustomError,RolPermisoModuloDatasource,RolPermisoModuloEntityOu, RegisterRolPermisoModuloDto,  } from "../../../../../domain/index.js";

import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
import { RolPermisoModuloMapper } from "../../mappers/rol.permiso.modulo.mapper.js";

export class RolPermisoModuloDatasourceImpl implements RolPermisoModuloDatasource { 

    async register(registerRolPermisoModuloDto:RegisterRolPermisoModuloDto,by:string):Promise<RolPermisoModuloEntityOu>{

        const { id_rol, id_permiso, id_modulo, estado} = registerRolPermisoModuloDto;
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT*FROM insertar_rol_permiso_modulo(p_id_rol:=$1,p_id_permiso:=$2,p_id_modulo:=$3,p_estado:=$4,p_by:=$5) as response;`;
            const values = [id_rol,id_permiso,id_modulo,estado,by];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result){
                if(result.rows[0].response.ok){
                    return RolPermisoModuloMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message})
                }
                return RolPermisoModuloMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message})
            }
            return RolPermisoModuloMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<RolPermisoModuloEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_roles_permisos_modulos AS response");

            if(result.rows.length>0){
                return RolPermisoModuloMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return RolPermisoModuloMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}