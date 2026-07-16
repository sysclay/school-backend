import { CustomError, DirectorDatasource, DirectorEntityOu, FilterDirectorDto, RegisterDirectorDto } from "../../../../../domain/index.js";
import { DirectorMapper } from "../../mappers/director.mapper.js";

import { PostgresConnection } from "../../../../database/postgres/index.js";
import { Validators } from "../../../../../utils/validators.js";

export class DirectorDatasourceImpl implements DirectorDatasource { 

    async register(registerDirectorDto: RegisterDirectorDto, by:string): Promise<DirectorEntityOu>{
        const { id_colegio, nombre, paterno,materno, id_documento, nro_documento,id_genero,correo,telefono,fecha_nacimiento,direccion,foto} = registerDirectorDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const fields = [
                { key: 'p_id_col', value: id_colegio},

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

            const query = `SELECT insertar_director(${paramNames}) AS response`;

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                if(result.rows[0].response.ok){
                    return DirectorMapper.DirectorEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
                } 
                return DirectorMapper.DirectorEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return DirectorMapper.DirectorEntityFromObject({ok:false,message:'No se inserto'});
            
        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){ throw error;}
            throw CustomError.internalServer();
        }
    }

    async findById(id: string): Promise<DirectorEntityOu> {
        try {
            const pool = PostgresConnection.getPool();

            const result = await pool.query("SELECT * FROM v_list_colegio WHERE id_colegio = $1", [id]);
            if(result.rows.length>0){
                return DirectorMapper.DirectorEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }else {
                return DirectorMapper.DirectorEntityFromObject({ok:false, message:'No encontrado'});
            }
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<DirectorEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_directores AS response");

            if(result.rows){
                return DirectorMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa fff'})
            }
            return DirectorMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findByIdColegio(id:string):Promise<DirectorEntityOu>{
        try {
            const pool = PostgresConnection.getPool();

            const query = `SELECT * FROM v_list_directores WHERE id_colegio=$1 AND estado=true`;
            const values = [id];

            const result = await pool.query(query, values);
            if(result.rows.length>0){
                return DirectorMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return DirectorMapper.findEntityFromObject({ok:false,message:'Operación exitosa', data: []})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterAll(filterDirectorDto:FilterDirectorDto):Promise<DirectorEntityOu>{
        try {
            const { nro_documento,year} = filterDirectorDto;
            const pool = PostgresConnection.getPool();

            const query = `SELECT * FROM v_list_directores WHERE id_colegio=$1 AND estado=true`;
            const values = [nro_documento];

            const result = await pool.query(query, values);
            if(result.rows.length>0){
                return DirectorMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return DirectorMapper.findEntityFromObject({ok:false,message:'Operación exitosa', data: []})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}