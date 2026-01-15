
import { CustomError, AlumnoDatasource, AlumnoEntityOu, RegisterAlumnoDto, FilterAlumnoDto } from "../../../../../domain/index.js";
import { AlumnoMapper } from "../../mappers/alumno.mapper.js";

// import { PostgresDatabase } from "../../../../../data/postgres/index.js";
import { QR } from "../../../../../config/index.js";
import { Validators } from "../../../../../utils/validators.js";
import { PostgresConnection } from "../../../../database/index.js";
export class AlumnoDatasourceImpl implements AlumnoDatasource { 

    async register(registerAlumnoDto: RegisterAlumnoDto, by:string): Promise<AlumnoEntityOu>{
        const { id_colegio, nombre, paterno,materno, id_documento, nro_documento,id_genero,correo,telefono,fecha_nacimiento,direccion,foto} = registerAlumnoDto;
        const pool = PostgresConnection.getPool();
        try {
            
            const fields = [
                { key: 'p_id_col', value: id_colegio},
                { key: 'p_qr_uri', value: nombre ? Validators.capitalizar(nombre) : undefined },
                { key: 'p_qr_code', value: nombre ? Validators.capitalizar(nombre) : undefined },

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

            const query = `SELECT insertar_alumno(${paramNames}) AS response`;

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT');
            if(result.rows.length>0){
                if(result.rows[0].response.ok){
                    const id_alumno = result.rows[0].response.data.id_alumno;
                    const qrBase64 = await QR.generate(id_alumno,id_alumno);

                    // Paso 3: Guardar la URI en la BD
                    const qrFileName = `${id_alumno}.png`;
                    // const qrUri = `/uploads/qr/${qrFileName}`; // o URL pública si usas S3/Cloud
                    const queryU = `UPDATE tbl_alumnos SET qr_uri=$1, qr_code=$2 where cod=$3`;
                    const valuesU = [ qrBase64,qrFileName,id_alumno];
                    await pool.query(queryU, valuesU);

                    return AlumnoMapper.alumnoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
                } 
                return AlumnoMapper.alumnoEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return AlumnoMapper.alumnoEntityFromObject({ok:false,message:'No se inserto'});
            
        } catch (error:any) {
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){ throw error;}
            throw CustomError.internalServer();
        }
    }

    async findById (id:string): Promise<AlumnoEntityOu> {
        const pool = PostgresConnection.getPool();
        try {
            await pool.query('BEGIN'); 
            const queryS = `SELECT*FROM v_list_alumnos WHERE estado=true AND id_alumno=$1`
            const result = await pool.query(queryS, [id]);
            await pool.query('COMMIT');
            if(result.rowCount===1){
                return AlumnoMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return AlumnoMapper.findByIdEntityFromObject({ok:false,message:'Sin datos'})

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll(page:number, limit:number):Promise<AlumnoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const offset = (page - 1) * limit;
            const query = `SELECT*FROM v_list_alumnos LIMIT $1 OFFSET $2`
            const result = await pool.query(query, [limit, offset]);

            if(result){
                return AlumnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AlumnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAllColegio(id_colegio:string):Promise<AlumnoEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const query = `SELECT*FROM v_list_alumnos WHERE id_colegio=$1`
            const values = [id_colegio]

            const result = await pool.query(query,values);

            if(result){
                return AlumnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AlumnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filter(filterAlumnoDto:FilterAlumnoDto):Promise<AlumnoEntityOu>{
        try {

            const { id_colegio, alumno,nro_docu } = filterAlumnoDto;
            const pool = PostgresConnection.getPool();
            let queryS = `SELECT*FROM v_list_alumnos WHERE id_colegio=$1`
            const values: any[] = [id_colegio];
            let index = 2;

            if (alumno) {
                queryS += ` AND CONCAT_WS(' ', nombre, paterno, materno) ILIKE $${index}`;
                values.push(`%${alumno}%`);
                index++;
                }

            if (nro_docu) {
                queryS += ` AND nro_doc::TEXT ILIKE $${index}`;
                values.push(`%${nro_docu}%`);
                index++;
            }
            queryS += ` LIMIT 5`;
            await pool.query('BEGIN'); 
            const result = await pool.query(queryS, values); 
            await pool.query('COMMIT'); 

            if(result){
                if(result.rowCount===0){
                    return AlumnoMapper.findEntityFromObject({ok:false, data:result.rows,message:'No encontrado'})
                }
                return AlumnoMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return AlumnoMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateQR (id:string): Promise<AlumnoEntityOu> {
        const pool = PostgresConnection.getPool();
        try {
            await pool.query('BEGIN'); 
            const query = `SELECT * FROM tbl_alumno WHERE id = $1`;
            const result = await pool.query(query, [id]);
            
            if(result.rowCount===1){
                const qrBase64 = await QR.generate(`${result.rows[0].codigo_id}`)
                const base64Data = qrBase64.split(",")[1];
                const qrBuffer  = Buffer.from(base64Data, "base64");

                const queryU = `update tbl_alumno set codigo_qr=$1 where id=$2 RETURNING *`;
                const valuesU = [qrBuffer,id];
                const resultU:any = await pool.query(queryU, valuesU); 
                await pool.query('COMMIT'); 
                if(resultU.rowCount>0){
                    return AlumnoMapper.findByIdEntityFromObject({ok:true, message:'Se actualiazo'});
                } else {
                    return AlumnoMapper.findByIdEntityFromObject({ok:false,message:'No se actualiazo'});
                }
            }
            return AlumnoMapper.findByIdEntityFromObject({ok:false,message:'No encontrado'})

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '22P02') { throw CustomError.badRequest(`La sintaxis no es valida`); }
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}