import { CustomError, LoginUsuarioDto, LoginDatasource, LoginEntityOu, CheckRolEntityOu, CheckRolUsuarioDto, TokenEntityOu } from "../../../../../domain/index.js";

import { PostgresConnection } from "../../../../database/postgres/index.js";
import { BcryptAdapter, JwtAdapter } from "../../../../../config/index.js";
import { LoginMapper } from "../../mappers/login.mapper.js";
import { CheckRolMapper } from "../../mappers/checkrol.mapper.js";
import { NOMEM } from "dns";
import { TokenMapper } from "../../mappers/token.mapper.js";

// type HashFunction = (password:string)=>string;
type CompareFunction = (password:string,hashed:string)=>boolean;
export class LoginDatasourceImpl implements LoginDatasource { 

    constructor(
        // private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly compareFunction: CompareFunction=BcryptAdapter.compare,
    ){}

    async login(loginUsuarioDto: LoginUsuarioDto): Promise<LoginEntityOu> {
        const { username,password } = loginUsuarioDto;
        const pool = PostgresConnection.getPool();
        try {
            const query = `SELECT login_usuario(p_username := $1) AS response`
            const values = [username];

            await pool.query('BEGIN');
            const result = await pool.query(query, values);
            await pool.query('COMMIT');


            if(result.rows.length>0){
            console.log(result.rows[0].response)
                if(result.rows[0].response.ok){
                    const isPasswordValid = await this.compareFunction(password, result.rows[0].response.hash);
                    if(isPasswordValid){
                        // console.log(result.rows[0].response)
                        const payload = {
                            id_usuario:result.rows[0].response.cod,
                            username:result.rows[0].response.username,
                            roles:result.rows[0].response.roles,
                            colegios:result.rows[0].response.colegios,
                        }

                        const token = await JwtAdapter.encryptWithRSA(payload);
                        // console.log(payload)
                        return LoginMapper.LoginEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message, token:token});                            

                    }else{
                        return LoginMapper.LoginEntityFromObject({ok:false,message:'Username o password inválido'});
                    }
                    
                }else{
                    return LoginMapper.LoginEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
                }
            }
            return LoginMapper.LoginEntityFromObject({ok:false,message:'Username o password inválido'});
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async checkRol(checkRolUsuarioDto:CheckRolUsuarioDto):Promise<CheckRolEntityOu>{
        try {
            const { id_colegio, id_rol, id_usuario, token } = checkRolUsuarioDto;
            const pool = PostgresConnection.getPool();

            const query = `SELECT seleccionar_rol_usuario(p_id_usuario:=$1,p_id_rol:=$2,p_id_colegio:=$3) AS response`
            const values = [id_usuario,id_rol,id_colegio];

            await pool.query('BEGIN');
            const result = await pool.query(query, values);
            await pool.query('COMMIT');

            // const payload = await JwtAdapter.verifyToken(token);
            const payload = await JwtAdapter.decryptWithRSA(token);
            if(!payload){
                return CheckRolMapper.CheckRolEntityFromObject({ok:false,message:'No encontrado',}); 
            } else {
                if(result.rows[0].response!==null){
                    const _payload = {
                        id_usuario:payload.id_usuario,
                        username:payload.username,
                        rol:{
                            id_rol:result.rows[0].response.id_rol,
                            rol_nombre:result.rows[0].response.rol,
                        },
                        colegio:id_colegio!==''?{
                            id_colegio:result.rows[0].response.id_colegio,
                            nombre_institucion:result.rows[0].response.colegio,          
                        }:null
                    }
                    // console.log('OKKK',_payload)
                    // const _token = await JwtAdapter.generateToken(_payload);
                    const _token = await JwtAdapter.encryptWithRSA(_payload);

                    return CheckRolMapper.CheckRolEntityFromObject({ok:true,message:'Login exitoso', token:_token});  
                } else {
                     return CheckRolMapper.CheckRolEntityFromObject({ok:false,message:'No encontrado'});
                }              
            }

        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async validar(token: string): Promise<TokenEntityOu>{
        // const { token } = validarTokenDto;
        try {
            // const payload = await JwtAdapter.verifyToken(token);// Verificar el token
            const payload = await JwtAdapter.decryptWithRSA(token);// Verificar el token
            // console.log('PAYLOAD::',payload);
            if (!payload) {
                return TokenMapper.TokenEntityFromObject({ok:false,message:'Token inválido o expirado'});
            } else { 
                // console.log(payload)
                const data = {
                    // id:payload.id,
                    id_usuario:payload.id_usuario,
                    username:payload.username,
                    roles:payload.roles,
                    colegios:payload.colegios,
                    rol:payload.rol,
                    colegio:payload.colegio,
                    // nro_documento:payload.nro_documento,
                    // nombre:payload.nombre,
                    // paterno:payload.paterno,
                    // materno:payload.materno,
                    // correo:payload.correo,
                    // telefono:payload.telefono,
                }
                // console.log('DATA TOKEN::',data)

                return TokenMapper.TokenEntityFromObject({ok:true,data:data,message:'Operación exitosa'});
            }
        } catch (error:any) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }



}