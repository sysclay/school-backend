import {  UsuarioDatasource, UsuarioEntityOu, UsuarioRepository, RegisterUsuarioDto, LoginUsuarioDto, UpdateEntityMessageOu, UpdateUsuarioDto} from "../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class UsuarioRepositoryImpl implements UsuarioRepository {

    constructor(
        private readonly usuarioDatasource: UsuarioDatasource,
    ){}

    register(registerUsuarioDto: RegisterUsuarioDto,by:string): Promise<UsuarioEntityOu> {
        return this.usuarioDatasource.register(registerUsuarioDto,by);
    }

    findById(id:string):Promise<UsuarioEntityOu>{
       return this.usuarioDatasource.findById(id);
    }

    findAll():Promise<UsuarioEntityOu>{
        return this.usuarioDatasource.findAll();
    }

    updateAll(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioEntityOu> {
        return this.usuarioDatasource.updateAll(id,updateUsuarioDto);
    }

    updateOne(id: string, updateUsuarioDto: UpdateUsuarioDto,by:string): Promise<UsuarioEntityOu> {
        return this.usuarioDatasource.updateOne(id,updateUsuarioDto,by);
    }

}