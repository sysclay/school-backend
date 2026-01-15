
import { CustomError, PersonaDatasource, PersonaEntityOu, RegisterPersonaDto, FilterPersonaDto, UpdatePersonaDto } from "../../../../../domain/index.js";
import { PersonaMapper } from "../../mappers/persona.mapper.js";
//import { PersonaModel } from "../../../data/mongodb/models/tipo.documento.model";

// import { PostgresDatabase } from "../../../data/postgres/index.js";
// import { QR } from "../../../config/index.js";
// import { Validators } from "../../../utils/index.js";
import { PostgresConnection } from "../../../../database/index.js";
import { Validators } from "../../../../../utils/validators.js";

export class PersonaDatasourceImpl implements PersonaDatasource { 

    async register(registerPersonaDto: RegisterPersonaDto,by:string): Promise<PersonaEntityOu>{
        const { nombre, paterno, materno, telefono, correo, nro_documento, id_documento, id_genero, direccion, fecha_nacimiento, foto } = registerPersonaDto;
        const pool = PostgresConnection.getPool();
        try {
            // Construir arrays dinámicos de campos y valores
            const fields = [
                { key: 'p_nom', value: nombre ? Validators.capitalizar(nombre) : undefined },
                { key: 'p_pat', value: paterno ? Validators.capitalizar(paterno) : undefined },
                { key: 'p_mat', value: materno ? Validators.capitalizar(materno) : undefined },
                { key: 'p_doc', value: nro_documento },
                { key: 'p_id_doc', value: id_documento },
                { key: 'p_id_gen', value: id_genero },
                { key: 'p_tel', value: telefono },
                { key: 'p_cor', value: correo ? correo.toLocaleLowerCase() : undefined },
                { key: 'p_dir', value: direccion },
                { key: 'p_nac', value: fecha_nacimiento },
                { key: 'p_fot', value: foto },
                { key: 'p_by', value: by }
            ];
            // Filtrar solo los campos que no son null ni undefined
            const filteredFields = fields.filter(f => f.value !== undefined && f.value !== null && f.value !== '');
            const paramPlaceholders = filteredFields.map((_, idx) => `$${idx + 1}`);
            const paramNames = filteredFields.map(f => `${f.key}:=${paramPlaceholders.shift()}`).join(', ');
            const values = filteredFields.map(f => f.value);
            const query = `SELECT insertar_persona(${paramNames}) AS response`;
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');

            if(result.rows.length>0){
                return PersonaMapper.PersonaEntityFromObject({
                    ok:result.rows[0].response.ok,
                    message:result.rows[0].response.message
                });
            }

            return PersonaMapper.PersonaEntityFromObject({ok:false,message:'No se registro'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }

            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findById(id:string):Promise<PersonaEntityOu>{
        try {

            const pool = PostgresConnection.getPool();
            const query =  `SELECT*FROM v_list_persona WHERE id_persona=$1;`
            const values = [id];

            await pool.query('BEGIN');
            const result = await pool.query(query, values);
            await pool.query('COMMIT');

            if(result.rows.length>0){
                return PersonaMapper.findByIdEntityFromObject({
                    ok:true, 
                    data:result.rows[0],
                    message:'Operación exitosa'
                })
            }
            return PersonaMapper.findByIdEntityFromObject({ok:false,message:'No encontrado'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


    // Pasar codigo a usuario 
    async findByIdPerfil(id:string):Promise<PersonaEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const query =  `SELECT*FROM v_perfil_persona WHERE id_usuario=$1;`
            const values = [id];

            await pool.query('BEGIN');
            const result = await pool.query(query, values);
            await pool.query('COMMIT');
            
            if(result.rowCount===1){
                return PersonaMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return PersonaMapper.findByIdEntityFromObject({ok:false,message:'No encontrado'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    
    async findByNDoc(ndoc:string):Promise<PersonaEntityOu>{
        try {

            const pool = PostgresConnection.getPool();
            const query =  `SELECT*FROM v_list_persona vlp WHERE vlp.estado=true AND vlp.nro_documento=$1;`
            const values = [ndoc];

            await pool.query('BEGIN');
            const result = await pool.query(query, values);
            await pool.query('COMMIT');
            
            if(result.rowCount===1){
                return PersonaMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return PersonaMapper.findByIdEntityFromObject({ok:false,message:'No encontrado'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterAll(FilterPersonaDto:FilterPersonaDto):Promise<PersonaEntityOu>{

        const {nro_documento  } = FilterPersonaDto;

        try {
            const pool = PostgresConnection.getPool();
            const query =  `SELECT*FROM v_list_persona vlp WHERE vlp.estado=true AND vlp.nro_documento=$1;`
            const values = [nro_documento];

            await pool.query('BEGIN');
            const result = await pool.query(query, values);
            await pool.query('COMMIT');
            
            if(result.rows.length>0){
                return PersonaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return PersonaMapper.findEntityFromObject({ok:false,message:'No encontrado'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }


    async findAll(page:number, limit:number):Promise<PersonaEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const query = `SELECT*FROM v_list_persona LIMIT $1 OFFSET $2`;
            const result = await pool.query(query, [limit, offset]);

            if(result){
                return PersonaMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return PersonaMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateById(id:string, updatePersonaDto:UpdatePersonaDto,by:string):Promise<PersonaEntityOu>{
        const { nombre, paterno,materno ,correo,telefono,direccion,fecha_nacimiento,estado,foto,id_genero} = updatePersonaDto;
        try {

            const pool = PostgresConnection.getPool();
            const fields = [
                { key: 'p_id_persona', value: id },
                { key: 'p_id_genero', value: id_genero },
                { key: 'p_nom', value: nombre },
                { key: 'p_pat', value: paterno },
                { key: 'p_mat', value: materno },
                { key: 'p_cor', value: correo },
                { key: 'p_dir', value: direccion },
                { key: 'p_tel', value: telefono },
                { key: 'p_nac', value: fecha_nacimiento },
                { key: 'p_fot', value: foto },
                { key: 'p_est', value: estado },
            ];
            // Filtro robusto: excluye undefined, null, NaN, string vacío o solo espacios
            const isValidValue = (v: unknown) =>
                v !== undefined &&
                v !== null &&
                !(typeof v === 'number' && isNaN(v)) &&
                !(typeof v === 'string' && v.trim() === '');

            const filteredFields = fields.filter(f => isValidValue(f.value));

            const paramPlaceholders = filteredFields.map((_, idx) => `$${idx + 1}`);
            const paramNames = filteredFields.map(f => `${f.key}:=${paramPlaceholders.shift()}`).join(',');

            const query = `SELECT update_persona(${paramNames}) AS response`;
            const values = filteredFields.map(f => f.value);
            const result = await pool.query(query, values);

            if(result){
                return PersonaMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return PersonaMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}



