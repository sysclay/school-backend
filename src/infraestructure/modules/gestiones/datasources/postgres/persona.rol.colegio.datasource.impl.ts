import { CustomError, PersonaRolColegioDatasource, PersonaRolColegioEntityOu, RegisterPersonaRolColegioDto, UpdatePersonaRolColegioDto } from "../../../../../domain/index.js";
import { PersonaRolColegioMapper } from "../../mappers/persona.rol.colegio.mapper.js";

import { PostgresConnection } from "../../../../database/postgres/index.js";

export class PersonaRolColegioDatasourceImpl implements PersonaRolColegioDatasource { 

    async register(registerPersonaRolColegioDto: RegisterPersonaRolColegioDto, by:string): Promise<PersonaRolColegioEntityOu>{
        const { id_persona,id_rol, id_colegio } = registerPersonaRolColegioDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const query = `SELECT insertar_persona_rol_colegio (p_id_persona:=$1, p_id_rol:=$2, p_id_colegio:=$3, p_by:=$4 ) AS response`;
            const values = [id_persona, id_rol, id_colegio, by ];
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return PersonaRolColegioMapper.PersonaRolColegioEntityFromObject({
                    ok:result.rows[0].response.ok, 
                    message:result.rows[0].response.message
                });
            }

            return PersonaRolColegioMapper.PersonaRolColegioEntityFromObject({ok:false,message:'Error'});

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

    async findAll(): Promise<PersonaRolColegioEntityOu> {
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_personas_roles_colegios");
            if (result.rows.length>0) {
                // console.log('HERE',result.rows.length)
                return PersonaRolColegioMapper.findEntityFromObject({ 
                    ok: true, 
                    data: result.rows, 
                    message: 'Operación exitosa' 
                });
            }
            return PersonaRolColegioMapper.findEntityFromObject({ ok: false, message: 'Error' });
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateAll(updatePersonaRolColegioDto: UpdatePersonaRolColegioDto, by: string): Promise<PersonaRolColegioEntityOu> {
        const { id_colegio, id_persona,id_rol, estado}= updatePersonaRolColegioDto;       
        try {
            const pool = PostgresConnection.getPool();

            const query = `SELECT update_persona_rol_colegio(p_id_colegio:=$1,p_id_persona:=$2,p_id_rol:=$3,p_estado:=$4, p_by:=$5) AS response`;
            const values = [id_colegio, id_persona,id_rol, estado,by];

            const result = await pool.query(query, values); 
            if(result){
                return PersonaRolColegioMapper.findEntityFromObject({ok:result.rows[0].response.ok, message:result.rows[0].response.message});
            }
            return PersonaRolColegioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if (error instanceof CustomError) { throw error; }
            throw CustomError.internalServer();
        }
    }

}