import { CheckRolEntityOu, CheckRolUsuarioDto, LoginDatasource, LoginEntityOu, LoginRepository, LoginUsuarioDto, TokenEntityOu } from "../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class LoginRepositoryImpl implements LoginRepository {

    constructor(
        private readonly loginDatasource: LoginDatasource,
    ){}

    login(loginUsuarioDto: LoginUsuarioDto): Promise<LoginEntityOu> {
        return this.loginDatasource.login(loginUsuarioDto);
    }

    checkRol(checkRolUsuarioDto: CheckRolUsuarioDto): Promise<CheckRolEntityOu> {
        return this.loginDatasource.checkRol(checkRolUsuarioDto);
    }

    validar(token: string): Promise<TokenEntityOu> {
        return this.loginDatasource.validar(token);
    } 
}