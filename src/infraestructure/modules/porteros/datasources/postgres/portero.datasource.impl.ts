
import { CustomError, PorteroDatasource, PorteroEntityOu, RegisterPorteroDto, FilterPorteroDto } from "../../../../../domain/index.js";
import { PorteroMapper } from "../../mappers/portero.mapper.js";

// import { PostgresDatabase } from "../../../../../data/postgres/index.js";
import { QR } from "../../../../../config/index.js";
import { Validators } from "../../../../../utils/validators.js";
import { PostgresConnection } from "../../../../database/index.js";
export class PorteroDatasourceImpl implements PorteroDatasource { 

    async register(registerPorteroDto: RegisterPorteroDto, by:string): Promise<PorteroEntityOu>{
        const { id_colegio, nombre, paterno,materno, id_documento, nro_documento,id_genero,correo,telefono,fecha_nacimiento,direccion,foto} = registerPorteroDto;
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

            const query = `SELECT insertar_portero(${paramNames}) AS response`;

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
            // if(true) {
                if(result.rows[0].response.ok){
                    // const id_portero = result.rows[0].response.data.id_portero;
                    // const qrBase64 = await QR.generate(id_portero,id_portero)
                    // console.log('QR generado:', qrBase64);
                    return PorteroMapper.porteroEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
                } 
                return PorteroMapper.porteroEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return PorteroMapper.porteroEntityFromObject({ok:false,message:'No se inserto'});
            
        } catch (error:any) {
            await pool.query('ROLLBACK');
            // console.log(error)
            if(error instanceof CustomError){ throw error;}
            throw CustomError.internalServer();
        }
    }

    async findById (id:string): Promise<PorteroEntityOu> {
        const pool = PostgresConnection.getPool();
        try {
            await pool.query('BEGIN'); 
            const queryS = `SELECT 
            alu.id,
            alu.codigo_id,
            doc.nom_corto as doc_tipo,
            per.nro_documento,
            per.nombre,
            per.apellido_paterno,
            per.apellido_materno,
            per.email as correo,
            per.telefono,
            alu.codigo_qr,
            alu.estado
            FROM tbl_portero alu INNER JOIN tbl_persona per
            ON alu.persona_id = per.id INNER JOIN tbl_tipo_documento doc
            ON per.tipo_documento_id = doc.id
            WHERE alu.estado = true and alu.id=$1`
            const result = await pool.query(queryS, [id]);
            await pool.query('COMMIT');
            if(result.rowCount===1){
                return PorteroMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return PorteroMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<PorteroEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const queryS = `SELECT*FROM v_list_porteros`
            const result = await pool.query(queryS);

            if(result){
                return PorteroMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return PorteroMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllColegio(id_colegio:string):Promise<PorteroEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT*FROM v_list_porteros WHERE id_colegio=$1`
            const values = [id_colegio]

            const result = await pool.query(query,values);

            if(result){
                return PorteroMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return PorteroMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filterAll(filterPorteroDto:FilterPorteroDto):Promise<PorteroEntityOu>{
        try {
            const { nro_documento,year} = filterPorteroDto;
            const pool = PostgresConnection.getPool();
            let queryS = `SELECT*FROM v_list_porteros WHERE id_colegio=$1`
            const values: any[] = [nro_documento];
            let index = 2;

            if (year) {
                queryS += ` AND CONCAT_WS(' ', nombre, paterno, materno) ILIKE $${index}`;
                values.push(`%${year}%`);
                index++;
                }

            if (year) {
                queryS += ` AND nro_doc::TEXT ILIKE $${index}`;
                values.push(`%${year}%`);
                index++;
            }
            queryS += ` LIMIT 5`;
            // console.log(queryS, values)
            await pool.query('BEGIN'); 
            const result = await pool.query(queryS, values); 
            await pool.query('COMMIT'); 

            if(result){
                if(result.rowCount===0){
                    return PorteroMapper.findEntityFromObject({ok:false, data:result.rows,message:'No encontrado'})
                }
                return PorteroMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return PorteroMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    // async updateQR (id:string): Promise<PorteroEntityOu> {
    //     const pool = PostgresConnection.getPool();
    //     try {
    //         await pool.query('BEGIN'); 
    //         const query = `SELECT * FROM tbl_portero WHERE id = $1`;
    //         const result = await pool.query(query, [id]);
            
    //         if(result.rowCount===1){
    //             const qrBase64 = await QR.generate(`${result.rows[0].codigo_id}`)
    //             const base64Data = qrBase64.split(",")[1];
    //             const qrBuffer  = Buffer.from(base64Data, "base64");

    //             const queryU = `update tbl_portero set codigo_qr=$1 where id=$2 RETURNING *`;
    //             const valuesU = [qrBuffer,id];
    //             const resultU:any = await pool.query(queryU, valuesU); 
    //             await pool.query('COMMIT'); 
    //             if(resultU.rowCount>0){
    //                 return PorteroMapper.findByIdEntityFromObject({ok:true, message:'Se actualiazo'});
    //             } else {
    //                 return PorteroMapper.findByIdEntityFromObject({ok:false,message:'No se actualiazo'});
    //             }
    //         }
    //         return PorteroMapper.findByIdEntityFromObject({ok:false,message:'No encontrado'})

    //     } catch (error:any) {
    //         await pool.query('ROLLBACK');
    //         if (error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }
    //         if(error instanceof CustomError){
    //             throw error;
    //         }
    //         throw CustomError.internalServer();
    //     }
    // }
}