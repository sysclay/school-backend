import { CustomError, PersonaRolDatasource, PersonaRolEntityOu, RegisterPersonaRolDto } from "../../../../../domain/index.js";
import { PersonaRolMapper } from "../../mappers/persona.rol.mapper.js";

import { PostgresConnection } from "../../../../database/postgres/index.js";

export class PersonaRolDatasourceImpl implements PersonaRolDatasource { 

    async register(registerPersonaRolDto: RegisterPersonaRolDto, by:string): Promise<PersonaRolEntityOu>{
        const { id_persona,id_rol } = registerPersonaRolDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `SELECT insertar_persona_rol (p_id_persona:=$1, p_id_rol:=$2,p_created_by:=$3 )`;
            const values = [id_persona, id_rol,by ];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return PersonaRolMapper.PersonaRolEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return PersonaRolMapper.PersonaRolEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            
            if (error.code === '23505') {
                if (error.constraint === 'tbl_PersonaRol_PersonaRol_grado_id_key') {
                    throw CustomError.badRequest(`El grado y PersonaRol ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_PersonaRol_grado_id_fkey') {
                    throw CustomError.badRequest(`El grado no existe`);
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

    async findAll(): Promise<PersonaRolEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_personas_roles");
            console.log(result.rows);
            if (result) {
                return PersonaRolMapper.findEntityFromObject({ ok: true, data: result.rows, message: 'Operación exitosa' });
            }
            return PersonaRolMapper.findEntityFromObject({ ok: false, message: 'Error' });
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }

}