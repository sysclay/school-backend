
import { CustomError, GeneroDatasource, GeneroEntityOu, RegisterGeneroDto } from "../../../../../domain/index.js";
import { PostgresConnection } from "../../../../database/index.js";
import { GeneroMapper } from "../../mappers/genero.mapper.js";
//import { GeneroModel } from "../../../data/mongodb/models/tipo.documento.model";

// import { PostgresDatabase } from "../../../data/postgres/index.js";

export class GeneroDatasourceImpl implements GeneroDatasource { 

    async register(registerGeneroDto: RegisterGeneroDto): Promise<GeneroEntityOu>{

        const { genero, abreviado} = registerGeneroDto;
        try {

            return GeneroMapper.generoEntityFromObject({ok:true, data:'',message:'Operación exitosa'});

        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findById (id:string): Promise<GeneroEntityOu> {
        try {


            return GeneroMapper.findByIdEntityFromObject({ok:true, data:'documento',message:'Operación exitosa'});
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async findAll():Promise<GeneroEntityOu>{
        try {
            const pool = PostgresConnection.getPool();
            const result = await pool.query("SELECT * FROM v_list_genero;");
            if(result){
                return GeneroMapper.findEntityFromObject({ok:true, data:result.rows,message:'Operación exitosa'})
            }
            return GeneroMapper.findEntityFromObject({ok:false,message:'Error'})
        } catch (error) {
            if(error instanceof CustomError){ throw error; }
            throw CustomError.internalServer();
        }
    }
}