import { CustomError, FcmDatasource, FcmEntityOu, FilterFcmDto, RegisterFcmDto, UpdateFcmDto } from "../../../../../domain/index.js";
import { FcmMapper } from "../../mappers/fcm.mapper.js";
import { PostgresConnection } from "../../../../database/postgres/index.js";
import { BcryptAdapter, JwtAdapter } from "../../../../../config/index.js";

export class FcmDatasourceImpl implements FcmDatasource { 

    async register(registerFcmDto: RegisterFcmDto,by:string): Promise<FcmEntityOu>{
        const { device_id,id_usuario,platform,token_fcm } = registerFcmDto;
        const pool = PostgresConnection.getPool();
        try {
            // console.log('ADD::',registerFcmDto)
            const query = `SELECT insertar_fcm(p_id_usu:=$1,p_tok:=$2, p_dev:=$3, p_pla:=$4, p_by:=$5 ) AS response`;
            const values = [id_usuario,token_fcm,device_id,platform, by]; 

            await pool.query('BEGIN');
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            // console.log('ADD FCM:.',result.rows)
            if(result.rows.length>0){
                return FcmMapper.EntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message});
            }
            return FcmMapper.EntityFromObject({ok:false,message:result.rows[0].response.message});

        } catch (error:any) {
            // console.log('ERROR FCM:.',error)
            await pool.query('ROLLBACK');
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findById(id:string):Promise<FcmEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const query =  `SELECT * FROM tbl_fcms WHERE estado = true AND codigo=$1;`
            const values = [id];

            await pool.query('BEGIN');
            const result = await pool.query(query, values);
            await pool.query('COMMIT');

            if(result.rowCount===1){
                return FcmMapper.findByIdEntityFromObject({ok:true, data:result.rows[0],message:'Operación exitosa'})
            }
            return FcmMapper.findByIdEntityFromObject({ok:false,message:'No encontrado'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<FcmEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_fcms");
            if(result){
                return FcmMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return FcmMapper.findEntityFromObject({ok:false,message:'Operación exitosa',data:[]})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    async filter(filterFcmDto:FilterFcmDto):Promise<FcmEntityOu>{
        try {
            const { device_id, id_usuario, token_fcm} = filterFcmDto;
            const pool = PostgresConnection.getPool();
            const query = `SELECT * FROM v_list_fcm WHERE device=$1 AND id_usuario=$2 AND token=$3`;
            const values = [device_id, id_usuario, token_fcm];
            const result = await pool.query(query, values);
            // console.log('FILET FCM ::',result.rows)
            if(result.rows.length>0){
                return FcmMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return FcmMapper.findEntityFromObject({ok:false,message:'Operación exitosa',data:[]})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

    // async updateAll(id: string, updateFcmDto: UpdateFcmDto): Promise<FcmEntityOu> {
    //     const { username, password, estado } = updateFcmDto;
    //     try {

    //         const updateFields: any = {};
    //         if (id) updateFields.p_codigo = id;
    //         if (username && username.trim() !== '') updateFields.p_username = username.toLocaleLowerCase();
    //         if (password && password.trim() !== '') updateFields.p_password = this.hashPassword(password);
    //         if (estado !== undefined) updateFields.p_estado = estado;

    //         const queryKeys = Object.keys(updateFields).map((key, index) => `${key} := $${index + 1}`).join(', ');
    //         const query = `SELECT update_fcm(${queryKeys}) AS response`;
    //         const queryParams = Object.values(updateFields);
            
    //         const pool = PostgresConnection.getPool();
    //         await pool.query('BEGIN'); 
    //         const result:any = await pool.query(query, queryParams); 
    //         await pool.query('COMMIT'); 

    //         if(result.rows.length>0){
    //             return FcmMapper.EntityFromObject({ok:result.rows[0].response.ok, message:result.rows[0].response.message});
    //         } 
    //         return FcmMapper.EntityFromObject({ok:false,message:'No se actualizo'});

    //     } catch (error:any) {
    //         if (error.code === 'P0001') {
    //             throw CustomError.badRequest(`${error.message}`);
    //         }
    //         if(error instanceof CustomError){ throw error; }
    //         throw CustomError.internalServer();
    //     }
    // }

    async updateOne(id: string, updateFcmDto: UpdateFcmDto, by:string): Promise<FcmEntityOu> {
        try {
            const { device_id,id_usuario, token_fcm } = updateFcmDto;
            const pool = PostgresConnection.getPool();

            const query = "SELECT update_fcm(p_id_usu:=$1,p_tok:=$2, p_dev:=$3, p_by:=$4 ) AS response";
            const values = [id_usuario,token_fcm,device_id,by]
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            if(result.rowCount!=0){
                return FcmMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message})
            }else {
                return FcmMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message})
            }

        } catch (error:any) {
            if (error.code === '22P02') {
                throw CustomError.badRequest(`La sintaxis no es valida`);
            }
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }

        async updateActive(id: string, updateFcmDto: UpdateFcmDto, by:string): Promise<FcmEntityOu> {
        try {
            const { device_id,id_usuario, active } = updateFcmDto;
            const pool = PostgresConnection.getPool();

            const query = "SELECT update_fcm_active(p_id_usu:=$1,p_active:=$2, p_dev:=$3, p_by:=$4 ) AS response";
            const values = [id_usuario,active,device_id,by]
            await pool.query('BEGIN'); 
            const result = await pool.query(query, values); 
            await pool.query('COMMIT'); 
            // console.log('HEREEE:::',result.rows[0].response)
            if(result.rowCount!=0){
                return FcmMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message})
            }else {
                return FcmMapper.findEntityFromObject({ok:result.rows[0].response.ok,message:result.rows[0].response.message})
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