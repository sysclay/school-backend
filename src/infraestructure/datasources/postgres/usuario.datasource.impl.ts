
import { CustomError, UsuarioDatasource, UsuarioEntityOu, RegisterUsuarioDto, LoginUsuarioDto } from "../../../domain/index.js";
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
        const { nro_documento,contrasena,correo,telefono } = registerUsuarioDto;
        const pool = PostgresDatabase.getPool();
        try {
            
            const query = `INSERT INTO tbl_usuario (nro_documento, contrasena, correo, telefono ) VALUES ($1, $2, $3, $4 ) RETURNING *`;
            const values = [nro_documento,this.hashPassword(contrasena),correo,telefono];

            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return UsuarioMapper.UsuarioEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'});
            }

            return UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Error'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            // console.log(error)
            if (error.code === '23505') {
                if (error.constraint === 'tbl_usuario_nro_documento_key') {
                    throw CustomError.badRequest(`El numero documento ya existe`);
                }
                if (error.constraint === 'tbl_usuario_correo_key') {
                    throw CustomError.badRequest(`El correo ya existe`);
                }
                if (error.constraint === 'tbl_usuario_telefono_key') {
                    throw CustomError.badRequest(`El telefono ya existe`);
                }
            }

            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async login(loginUsuarioDto: LoginUsuarioDto): Promise<UsuarioEntityOu> {
        const { nro_documento,contrasena } = loginUsuarioDto;
        const pool = PostgresDatabase.getPool();
        try {
            const query = `SELECT * FROM tbl_usuario where nro_documento = $1`;
            const values = [nro_documento];

            await pool.query('BEGIN');
            const result = await pool.query(query, values);
            await pool.query('COMMIT');
            
            if(result.rows.length>0){
                const isPasswordValid = await this.compareFunction(contrasena, result.rows[0].contrasena);
                if(isPasswordValid){

                    const token = await JwtAdapter.generateToken({id:result.rows[0].id,nro_documento});
                    //const b = await JwtAdapter.verifyToken(token);
                    //console.log(token, b)
                    //console.log(result.rows)
                    const newData = {...result.rows[0], token} 

                    return UsuarioMapper.UsuarioEntityFromObject({ok:true, data:newData,message:'Operación exitosa'});
                }else{
                    return UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Usuario no encontrado'});
                }
            }
            return UsuarioMapper.UsuarioEntityFromObject({ok:false,message:'Usuario no encontrado'});
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
            //console.log('LISTA',result)
            if(result){
                return UsuarioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return UsuarioMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}