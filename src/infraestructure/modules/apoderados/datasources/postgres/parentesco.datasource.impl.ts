
import { CustomError, ParentescoDatasource, ParentescoEntityOu, RegisterParentescoDto } from "../../../../../domain/index.js";
import { ParentescoMapper } from "../../mappers/parentesco.mapper.js";

// import { PostgresDatabase } from "../../../../../data/postgres/index.js";
import { QR } from "../../../../../config/index.js";
import { Validators } from "../../../../../utils/validators.js";
import { PostgresConnection } from "../../../../database/index.js";
export class ParentescoDatasourceImpl implements ParentescoDatasource { 

    async register(registerParentescoDto: RegisterParentescoDto, by:string): Promise<ParentescoEntityOu>{
        const { cod_parentesco,nom_parentesco} = registerParentescoDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const fields = [
                { key: 'p_cod', value: cod_parentesco ? Validators.capitalizar(cod_parentesco) : undefined},
                { key: 'p_nom', value: nom_parentesco ? Validators.capitalizar(nom_parentesco) : undefined },
            ];
            // Filtrar solo los campos que no son null ni undefined
            const filteredFields = fields.filter(f => f.value !== undefined && f.value !== null && f.value !== '');
            const paramPlaceholders = filteredFields.map((_, idx) => `$${idx + 1}`);
            const paramNames = filteredFields.map(f => `${f.key}:=${paramPlaceholders.shift()}`).join(', ');
            const values = filteredFields.map(f => f.value);

            const query = `SELECT insertar_parentesco(${paramNames}) AS response`;

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
            // if(true) {
                if(result.rows[0].response.ok){
                    // const id_parentesco = result.rows[0].response.data.id_parentesco;
                    // const qrBase64 = await QR.generate(id_parentesco,id_parentesco)
                    // console.log('QR generado:', qrBase64);
                    return ParentescoMapper.parentescoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
                } 
                return ParentescoMapper.parentescoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return ParentescoMapper.parentescoEntityFromObject({ok:false,message:'No se inserto'});
            
        } catch (error:any) {
            await pool.query('ROLLBACK');
            // console.log(error)
            if(error instanceof CustomError){ throw error;}
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<ParentescoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const queryS = `SELECT*FROM v_list_parentesco`
            const result = await pool.query(queryS);

            if(result){
                return ParentescoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ParentescoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllActive():Promise<ParentescoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const queryS = `SELECT*FROM v_list_parentesco WHERE estado=true`
            const result = await pool.query(queryS);

            if(result){
                return ParentescoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return ParentescoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    // async findAllColegio(id_colegio:string):Promise<ParentescoEntityOu>{
    //     try {
    //         const pool = PostgresConnection.getPool();
    //         const query = `SELECT*FROM v_list_parentescos WHERE id_colegio=$1`
    //         const values = [id_colegio]

    //         const result = await pool.query(query,values);

    //         if(result){
    //             return ParentescoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
    //         }
    //         return ParentescoMapper.findEntityFromObject({ok:false,message:'Error'})
    //     } catch (error) {
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }

    // async filterAll(filterParentescoDto:FilterParentescoDto):Promise<ParentescoEntityOu>{
    //     try {
    //         const { nro_documento,year} = filterParentescoDto;
    //         const pool = PostgresConnection.getPool();
    //         let queryS = `SELECT*FROM v_list_parentescos WHERE id_colegio=$1`
    //         const values: any[] = [nro_documento];
    //         let index = 2;

    //         if (year) {
    //             queryS += ` AND CONCAT_WS(' ', nombre, paterno, materno) ILIKE $${index}`;
    //             values.push(`%${year}%`);
    //             index++;
    //             }

    //         if (year) {
    //             queryS += ` AND nro_doc::TEXT ILIKE $${index}`;
    //             values.push(`%${year}%`);
    //             index++;
    //         }
    //         queryS += ` LIMIT 5`;
    //         // console.log(queryS, values)
    //         await pool.query('BEGIN'); 
    //         const result = await pool.query(queryS, values); 
    //         await pool.query('COMMIT'); 

    //         if(result){
    //             if(result.rowCount===0){
    //                 return ParentescoMapper.findEntityFromObject({ok:false, data:result.rows,message:'No encontrado'})
    //             }
    //             return ParentescoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
    //         }
    //         return ParentescoMapper.findEntityFromObject({ok:false,message:'Error'})
    //     } catch (error) {
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }

    // async updateQR (id:string): Promise<ParentescoEntityOu> {
    //     const pool = PostgresConnection.getPool();
    //     try {
    //         await pool.query('BEGIN'); 
    //         const query = `SELECT * FROM tbl_parentesco WHERE id = $1`;
    //         const result = await pool.query(query, [id]);
            
    //         if(result.rowCount===1){
    //             const qrBase64 = await QR.generate(`${result.rows[0].codigo_id}`)
    //             const base64Data = qrBase64.split(",")[1];
    //             const qrBuffer  = Buffer.from(base64Data, "base64");

    //             const queryU = `update tbl_parentesco set codigo_qr=$1 where id=$2 RETURNING *`;
    //             const valuesU = [qrBuffer,id];
    //             const resultU:any = await pool.query(queryU, valuesU); 
    //             await pool.query('COMMIT'); 
    //             if(resultU.rowCount>0){
    //                 return ParentescoMapper.findByIdEntityFromObject({ok:true, message:'Se actualiazo'});
    //             } else {
    //                 return ParentescoMapper.findByIdEntityFromObject({ok:false,message:'No se actualiazo'});
    //             }
    //         }
    //         return ParentescoMapper.findByIdEntityFromObject({ok:false,message:'No encontrado'})

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