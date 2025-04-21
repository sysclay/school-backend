
import { CustomError, PersonaDatasource, PersonaEntityOu, RegisterPersonaDto, FilterPersonaDto } from "../../../domain/index.js";
import { PersonaMapper } from "../../mappers/persona.mapper.js";
//import { PersonaModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { QR } from "../../../config/index.js";
import { Validators } from "../../../utils/index.js";

export class PersonaDatasourceImpl implements PersonaDatasource { 

    async register(registerPersonaDto: RegisterPersonaDto): Promise<PersonaEntityOu>{
        const { nombre, apellido_paterno, apellido_materno,telefono,correo, nro_documento,tipo_documento_id} = registerPersonaDto;
        const pool = PostgresDatabase.getPool();
        try {
           
            const query = `INSERT INTO tbl_persona (nombre,apellido_paterno, apellido_materno,telefono,email,nro_documento,tipo_documento_id) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *`;
            const values = [Validators.capitalizar(nombre), Validators.capitalizar(apellido_paterno),Validators.capitalizar(apellido_materno),telefono, correo.toLocaleLowerCase(), nro_documento.toLocaleLowerCase(), tipo_documento_id];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                return PersonaMapper.PersonaEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return PersonaMapper.PersonaEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                // return PersonaMapper.PersonaEntityFromObject({ok:false,message:'El numero documento ya existe'});
                if (error.constraint === 'tbl_persona_nro_documento_key') {
                    throw CustomError.badRequest(`El numero documento ya existe`);
                }
                if (error.constraint === 'tbl_persona_email_key') {
                    throw CustomError.badRequest(`El correo ya existe`);
                }
                if (error.constraint === 'tbl_email_telefono_key') {
                    throw CustomError.badRequest(`El telefono ya existe`);
                }
                // throw CustomError.badRequest(`El numero documento ya existe`);
            }
            if (error.code === '23503') {
                throw CustomError.badRequest(`El tipo documento no existe`);
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

}