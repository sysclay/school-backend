import {  UsuarioDatasource, UsuarioEntityOu, UsuarioRepository, RegisterUsuarioDto, LoginUsuarioDto, UpdateEntityMessageOu, UpdateUsuarioDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class UsuarioRepositoryImpl implements UsuarioRepository {

    constructor(
        private readonly usuarioDatasource: UsuarioDatasource,
    ){}

    register(registerUsuarioDto: RegisterUsuarioDto): Promise<UsuarioEntityOu> {
        return this.usuarioDatasource.register(registerUsuarioDto);
    }

    login(loginUsuarioDto: LoginUsuarioDto): Promise<UsuarioEntityOu> {
        return this.usuarioDatasource.login(loginUsuarioDto);
    }



    //findById(id:string):Promise<UsuarioEntityOu|null>{
    //    return this.UsuarioDatasource.findById(id);
    //}
//
    findAll():Promise<UsuarioEntityOu>{
        return this.usuarioDatasource.findAll();
    }

    updateAll(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioEntityOu> {
        return this.usuarioDatasource.updateAll(id,updateUsuarioDto);
    }

}