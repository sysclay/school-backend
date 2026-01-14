import { CustomError, PermisoDatasource, PermisoEntityOu, CheckRolEntityOu, CheckRolUsuarioDto, RegisterPermisoDto, UpdatePermisoDto } from "../../../../../domain/index.js";

// import { PostgresDatabase } from "../../../data/postgres/index.js";
import { PostgresConnection } from "../../../../../infraestructure/database/index.js";
import { PermisoMapper } from "../../mappers/permiso.mapper.js";

export class PermisoDatasourceImpl implements PermisoDatasource { 

    // REGISTRAR PERMISO
    async register(registerPermisoDto: RegisterPermisoDto,by:string): Promise<PermisoEntityOu> {
        const { codigo,nombre,descripcion} = registerPermisoDto;
        try {
            const pool = PostgresConnection.getPool();

            const query = `SELECT insertar_permiso (p_codigo:=$1,p_nombre:=$2,p_descripcion:=$3,p_by:=$4) AS response`
            const values = [codigo,nombre,descripcion,by];


            await pool.query('BEGIN');
            const result = await pool.query(query,values);
            await pool.query('COMMIT');
            if(result.rows.length>0){
                return PermisoMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message}); 
            } 

            return PermisoMapper.findEntityFromObject({ok:false,message:'Error'}); 

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    // LISTAR PERMISOS
    async findAll():Promise<PermisoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();

            const query = `SELECT*FROM v_list_permisos AS response`

            await pool.query('BEGIN');
            const result = await pool.query(query);
            await pool.query('COMMIT');

            if(result.rows.length>0){
                return PermisoMapper.findEntityFromObject({ok:true, data:result.rows ,message:'Operación exitosa'}); 
            } 

            return PermisoMapper.findEntityFromObject({ok:false,message:'No encontrado',}); 

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }   
    }

    // ACTUALIZAR PERMISO
    async updateAll(id:string,updatePermisoDto:UpdatePermisoDto,by:string):Promise<PermisoEntityOu>{

        const { nombre,descripcion,estado} = updatePermisoDto;
        try {

            const pool = PostgresConnection.getPool();
            const fields = [
                { key: 'p_id_permiso', value: id },
                { key: 'p_nombre', value: nombre },
                { key: 'p_descripcion', value: descripcion },
                { key: 'p_estado', value: estado },
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

            const query = `SELECT update_permiso(${paramNames}) AS response`;
            const values = filteredFields.map(f => f.value);
            const result = await pool.query(query, values);

            if(result){
                return PermisoMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return PermisoMapper.findEntityFromObject({ok:false,message:'Error'})

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            } 
            throw CustomError.internalServer();
        }

    }



}