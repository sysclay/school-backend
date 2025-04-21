
import { CustomError, TokenDatasource, TokenEntityOu, ValidarTokenDto } from "../../../domain/index.js";
import { TokenMapper } from "../../mappers/token.mapper.js";
//import { TokenModel } from "../../../data/mongodb/models/tipo.documento.model";

import { PostgresDatabase } from "../../../data/postgres/index.js";
import { JwtAdapter } from "../../../config/jwt.js";

export class TokenDatasourceImpl implements TokenDatasource { 

    async validar(validarTokenDto: ValidarTokenDto): Promise<TokenEntityOu>{
        const { token } = validarTokenDto;
        try {
            const payload = await JwtAdapter.verifyToken(token);// Verificar el token
            if (!payload) {
                return TokenMapper.TokenEntityFromObject({ok:false,message:'Token inválido o expirado'});
            } else { 
                const data = {
                    id:payload.id,
                    username:payload.username,
                    nro_documento:payload.nro_documento,
                    nombre:payload.nombre,
                    paterno:payload.paterno,
                    materno:payload.materno,
                    correo:payload.correo,
                    telefono:payload.telefono,
                }
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