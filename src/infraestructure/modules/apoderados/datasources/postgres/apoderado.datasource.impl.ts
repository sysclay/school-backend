
import { CustomError, ApoderadoDatasource, ApoderadoEntityOu, RegisterApoderadoDto, FilterApoderadoDto } from "../../../../../domain/index.js";
import { ApoderadoMapper } from "../../mappers/apoderado.mapper.js";

// import { PostgresDatabase } from "../../../../../data/postgres/index.js";
import { QR } from "../../../../../config/index.js";
import { Validators } from "../../../../../utils/validators.js";
import { PostgresConnection } from "../../../../database/index.js";
export class ApoderadoDatasourceImpl implements ApoderadoDatasource { 

    async register(registerApoderadoDto: RegisterApoderadoDto, by:string): Promise<ApoderadoEntityOu>{
        const { id_colegio, nombre, paterno,materno, id_documento, nro_documento,id_genero,correo,telefono,fecha_nacimiento,direccion,foto} = registerApoderadoDto;
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

            const query = `SELECT insertar_apoderado(${paramNames}) AS response`;

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                if(result.rows[0].response.ok){
                    return ApoderadoMapper.apoderadoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
                } 
                return ApoderadoMapper.apoderadoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return ApoderadoMapper.apoderadoEntityFromObject({ok:false,message:'No se inserto'});
            
        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){ throw error;}
            throw CustomError.internalServer();
        }
    }

    async findById (id:string): Promise<ApoderadoEntityOu> {
        const pool = PostgresConnection.getPool();
        try {
            await pool.query('BEGIN'); 
            const queryS = `SELECT*FROM v_list_apoderados WHERE id_apoderado=$1`
            const result = await pool.query(queryS, [id]);
            await pool.query('COMMIT');
            if(result.rowCount===1){
                return ApoderadoMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return ApoderadoMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<ApoderadoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const queryS = `SELECT*FROM v_list_apoderados`
            const result = await pool.query(queryS);

            if(result){
                return ApoderadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ApoderadoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllColegio(id_colegio:string):Promise<ApoderadoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT*FROM v_list_apoderados WHERE id_colegio=$1`
            const values = [id_colegio]

            const result = await pool.query(query,values);

            if(result){
                return ApoderadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ApoderadoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterAll(filterApoderadoDto:FilterApoderadoDto):Promise<ApoderadoEntityOu>{
        try {
            const { nro_documento,year} = filterApoderadoDto;
            const pool = PostgresConnection.getPool();
            let queryS = `SELECT*FROM v_list_apoderados WHERE id_colegio=$1`
            const values: any[] = [nro_documento];
            let index = 2;

            // console.log(filterApoderadoDto)
            // if (year) {
            //     queryS += ` AND CONCAT_WS(' ', nombre, paterno, materno) ILIKE $${index}`;
            //     values.push(`%${year}%`);
            //     index++;
            //     }

            // if (year) {
            //     queryS += ` AND nro_doc::TEXT ILIKE $${index}`;
            //     values.push(`%${year}%`);
            //     index++;
            // }
            // queryS += ` LIMIT 5`;
            // console.log(queryS, values)
            await pool.query('BEGIN'); 
            const result = await pool.query(queryS, values); 
            await pool.query('COMMIT'); 

            if(result){
                if(result.rowCount===0){
                    return ApoderadoMapper.findEntityFromObject({ok:false, data:result.rows,message:'No encontrado'})
                }
                return ApoderadoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ApoderadoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}