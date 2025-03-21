import {  UsuariorolDatasource, UsuariorolEntityOu, UsuariorolRepository, RegisterUsuariorolDto} from "../../domain/index.js";
// import { RegisterTipoUsuariorolDto } from "../../domain/dtos/tipoUsuariorol/register.Usuariorol.dto";

export class UsuariorolRepositoryImpl implements UsuariorolRepository {

    constructor(
        private readonly usuariorolDatasource: UsuariorolDatasource,
    ){}

    register(registerUsuariorolDto: RegisterUsuariorolDto): Promise<UsuariorolEntityOu> {
        return this.usuariorolDatasource.register(registerUsuariorolDto);
    }

    //findById(id:string):Promise<UsuariorolEntityOu|null>{
    //    return this.UsuariorolDatasource.findById(id);
    //}
//
    findAll():Promise<UsuariorolEntityOu>{
        return this.usuariorolDatasource.findAll();
    }

}