import {  TokenDatasource, TokenEntityOu, TokenRepository, ValidarTokenDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class TokenRepositoryImpl implements TokenRepository {

    constructor(
        private readonly tokenDatasource: TokenDatasource,
    ){}

    validar(validarTokenDto: ValidarTokenDto): Promise<TokenEntityOu> {
        return this.tokenDatasource.validar(validarTokenDto);
    } 

    //findById(id:string):Promise<TokenEntityOu|null>{
    //    return this.TokenDatasource.findById(id);
    //}
//
    // findAll():Promise<TokenEntityOu>{
    //     return this.TokenDatasource.findAll();
    // }

}