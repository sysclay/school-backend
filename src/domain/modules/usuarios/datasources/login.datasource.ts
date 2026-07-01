import { LoginUsuarioDto } from "../dtos/login.usuario.dto.js";
import { LoginEntityOu } from "../entities/ou/login.entity.js";
import { CheckRolUsuarioDto } from "../dtos/check.usuario.dto.js";
import { CheckRolEntityOu } from "../entities/ou/checkrol.entity.js";
import { TokenEntityOu } from "../entities/ou/token.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class LoginDatasource {

    abstract login(loginUsuarioDto:LoginUsuarioDto): Promise<LoginEntityOu>;
    abstract checkRol(checkRolUsuarioDto:CheckRolUsuarioDto): Promise<CheckRolEntityOu>;

    abstract validar(token:string): Promise<TokenEntityOu>;



}