
import { CustomError, UsuarioDatasource, UsuarioEntityOu, RegisterUsuarioDto, LoginUsuarioDto, UpdateEntityMessageOu, UpdateUsuarioDto } from "../../../domain/index.js";
import { UsuarioMapper } from "../../mappers/usuario.mapper.js";
//import { UsuarioModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { BcryptAdapter, JwtAdapter } from "../../../config/index.js";

type HashFunction = (password:string)=>string;
type CompareFunction = (password:string,hashed:string)=>boolean;
export class UsuarioDatasourceImpl implements UsuarioDatasource { 

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly compareFunction: CompareFunction=BcryptAdapter.compare,
    ){}

    async register(registerUsuarioDto: RegisterUsuarioDto): Promise<UsuarioEntityOu>{
        const { username,contrasena, persona_id } = registerUsuarioDto;
        const pool = PostgresDatabase.getPool();
        try {

            await pool.query('BEGIN');
            const queryS = `SELECT*FROM tbl_persona WHERE id=$1`;
            const valueS = [persona_id];
            const resultS = await pool.query(queryS, valueS);
            if(resultS.rows.length>0){
                const find = resultS.rows.find(i=>String(i.id)===String(persona_id));
                if (!find) { UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Persona no existe'}); }
                const posibleUsername = [find.email,find.telefono,find.nro_documento];
                const isValid = posibleUsername.includes(username.toLocaleLowerCase());
                if(isValid){
                    const queryI = `INSERT INTO tbl_usuario (username, contrasena, persona_id) VALUES ($1, $2, $3 ) RETURNING *`;
                    const valuesI = [username,this.hashPassword(contrasena),persona_id]; 
                    const resultI = await pool.query(queryI, valuesI); 
                    await pool.query('COMMIT'); 
                    if(resultI.rows.length>0){
                        return UsuarioMapper.UsuarioEntityFromObject({ok:true, data:resultI.rows[0],message:'Operación exitosa'});
                    }
                    return UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Insercion no valido'});
                }
                return UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Username no valido'});
            } 
            return UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Persona no existe'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            if (error.code === '23505') {
                if (error.constraint === 'tbl_usuario_username_key') {
                    throw CustomError.badRequest(`El username ya existe`);
                }
            }
            if (error.code === '23503') {
                if (error.constraint === 'tbl_usuario_persona_id_fkey') {
                    throw CustomError.badRequest(`Persona no existe`);
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

    async login(loginUsuarioDto: LoginUsuarioDto): Promise<UsuarioEntityOu> {
        const { username,contrasena } = loginUsuarioDto;
        const pool = PostgresDatabase.getPool();
        try {
            const queryS = `SELECT
            u.id,
            u.codigo_id,
            u.username,
            u.contrasena,
            p.nro_documento,
            p.nombre,
            p.apellido_paterno as paterno,
            p.apellido_materno as materno,
            p.email as correo,
            p.telefono
            FROM tbl_usuario u INNER JOIN tbl_persona p
            ON u.persona_id = p.id 
            WHERE u.username = $1 and u.estado=true`
            const values = [username];

            await pool.query('BEGIN');
            const result = await pool.query(queryS, values);
            await pool.query('COMMIT');

            if(result.rows.length>0){
                const isPasswordValid = await this.compareFunction(contrasena, result.rows[0].contrasena);
                if(isPasswordValid){
                    const find = result.rows.find(i=>String(i.username)===String(username));
                    if (!find) { UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Usuario no existe'}); }

                    const payload = {
                        id:find.id,
                        username:find.username,
                        nro_documento:find.nro_documento,
                        nombre:find.nombre,
                        paterno:find.paterno,
                        materno:find.materno,
                        correo:find.correo,
                        telefono:find.telefono,
                    }
                    const token = await JwtAdapter.generateToken(payload);
                    const newData = {...result.rows[0], token};
                    return UsuarioMapper.UsuarioEntityFromObject({ok:true, data:newData,message:'Operación exitosa'});
                }else{
                    return UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Usuario no existe'});
                }
            }
            return UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Usuario no existe'});
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<UsuarioEntityOu>{
        try {
            const pool = PostgresDatabase.getPool();
            const result = await pool.query("SELECT * FROM tbl_usuario where estado = true");

            if(result){
                return UsuarioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return UsuarioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateAll(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioEntityOu> {
        const { authenticated } = updateUsuarioDto;
        try {
            const pool = PostgresDatabase.getPool();
            const query = 'update tbl_usuario set authenticated=$1 where id=$2';
            const values = [authenticated,id];

            await pool.query('BEGIN'); 
            const result1:any = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result1.rowCount>0){
                return UsuarioMapper.findByIdEntityFromObject({ok:true, message:'Se actualizo'});
            } else {
                return UsuarioMapper.findByIdEntityFromObject({ok:false,message:'No se actualizo'});
            }

        } catch (error:any) {
            if (error.code === '22P02') {
                throw CustomError.badRequest(`La sintaxis no es valida`);
            }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}