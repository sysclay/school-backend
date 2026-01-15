import { CustomError, UsuarioDatasource, UsuarioEntityOu, RegisterUsuarioDto, LoginUsuarioDto, UpdateUsuarioDto } from "../../../../../domain/index.js";
import { UsuarioMapper } from "../../mappers/usuario.mapper.js";
import { PostgresConnection } from "../../../../database/postgres/index.js";
import { BcryptAdapter, JwtAdapter } from "../../../../../config/index.js";

type HashFunction = (password:string)=>string;
type CompareFunction = (password:string,hashed:string)=>boolean;
export class UsuarioDatasourceImpl implements UsuarioDatasource { 

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly compareFunction: CompareFunction=BcryptAdapter.compare,
    ){}

    async register(registerUsuarioDto: RegisterUsuarioDto,by:string): Promise<UsuarioEntityOu>{
        const { username,password, id_persona } = registerUsuarioDto;
        const pool = PostgresConnection.getPool();
        try {

            const query = `SELECT insertar_usuario(p_user:=$1, p_pass:=$2, p_id_persona:=$3, p_by:=$4 ) AS response`;
            const values = [username.toLocaleLowerCase(),this.hashPassword(password),id_persona, by]; 

            await pool.query('BEGIN');
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rows.length>0){
                return UsuarioMapper.EntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return UsuarioMapper.EntityFromObject({ok:false,message:'No se registro'});

        } catch (error:any) {
            await pool.query('ROLLBACK');
            console.log(error)
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findById(id:string):Promise<UsuarioEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const query =  `SELECT * FROM tbl_usuarios WHERE estado = true AND codigo=$1;`
            const values = [id];

            await pool.query('BEGIN');
            const result = await pool.query(query, values);
            await pool.query('COMMIT');

            if(result.rowCount===1){
                return UsuarioMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return UsuarioMapper.findByIdEntityFromObject({ok:false,message:'No encontrado'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<UsuarioEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_usuarios");
            if(result){
                return UsuarioMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return UsuarioMapper.findEntityFromObject({ok:false,message:'Operación exitosa',data:[]})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateAll(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioEntityOu> {
        const { username, password, estado } = updateUsuarioDto;
        try {

            const updateFields: any = {};
            if (id) updateFields.p_codigo = id;
            if (username && username.trim() !== '') updateFields.p_username = username.toLocaleLowerCase();
            if (password && password.trim() !== '') updateFields.p_password = this.hashPassword(password);
            if (estado !== undefined) updateFields.p_estado = estado;

            const queryKeys = Object.keys(updateFields).map((key, index) => `${key} := $${index + 1}`).join(', ');
            const query = `SELECT update_usuario(${queryKeys}) AS response`;
            const queryParams = Object.values(updateFields);
            
            const pool = PostgresConnection.getPool();
            await pool.query('BEGIN'); 
            const result:any = await pool.query(query, queryParams); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return UsuarioMapper.EntityFromObject({ok:result.rows[0].response.ok, message:result.rows[0].response.message});
            } 
            return UsuarioMapper.EntityFromObject({ok:false,message:'No se actualizo'});

        } catch (error:any) {
            if (error.code === 'P0001') {
                throw CustomError.badRequest(`${error.message}`);
            }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async updateOne(id: string, updateUsuarioDto: UpdateUsuarioDto, by:string): Promise<UsuarioEntityOu> {
        const { username, password, estado } = updateUsuarioDto;
        try {
            const updateFields: any = {};
            if (id) updateFields.p_cod = id;
            if (username && username.trim() !== '') updateFields.p_user = username.toLocaleLowerCase();
            if (password && password.trim() !== '') updateFields.p_pass = this.hashPassword(password);
            if (estado !== undefined) updateFields.p_est = estado;

            const pool = PostgresConnection.getPool();
            await pool.query('BEGIN'); 
            if(password && password.trim() !== ''){
                const querySearch = `SELECT u.password FROM tbl_usuarios u WHERE cod = $1;`;
                const values = [id];
                const resultSearch = await pool.query(querySearch, values);

                if(resultSearch.rows.length===0){ return UsuarioMapper.EntityFromObject({ok:false,message:'No se actualizo'}); }
                const isPasswordValid = await this.compareFunction(password!, resultSearch.rows[0].password);
                if(isPasswordValid){
                    return UsuarioMapper.EntityFromObject({ok:false,message:'La contraseña no puede ser la misma'});
                }                
            }

            const queryKeys = Object.keys(updateFields).map((key, index) => `${key} := $${index + 1}`).join(', ');
            const query = `SELECT update_usuario(${queryKeys}) AS response`;
            const queryParams = Object.values(updateFields);
            
            const result:any = await pool.query(query, queryParams); 
            await pool.query('COMMIT'); 

            if(result.rows.length>0){
                return UsuarioMapper.EntityFromObject({ok:result.rows[0].response.ok, message:result.rows[0].response.message});
            } 
            return UsuarioMapper.EntityFromObject({ok:false,message:'No se actualizo'});

        } catch (error:any) {
            console.log(9, error)
            if (error.code === 'P0001') {
                throw CustomError.badRequest(`${error.message}`);
            }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

}

// const dm = '489e4a35302e4824a3e9d6b42470c33b5009e3fe'