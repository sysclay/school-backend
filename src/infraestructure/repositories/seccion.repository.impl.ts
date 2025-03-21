import {  SeccionDatasource, SeccionEntityOu, SeccionRepository, RegisterSeccionDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class SeccionRepositoryImpl implements SeccionRepository {

    constructor(
        private readonly seccionDatasource: SeccionDatasource,
    ){}

    register(registerSeccionDto: RegisterSeccionDto): Promise<SeccionEntityOu> {
        return this.seccionDatasource.register(registerSeccionDto);
    } 

    //findById(id:string):Promise<SeccionEntityOu|null>{
    //    return this.SeccionDatasource.findById(id);
    //}
//
    findAll():Promise<SeccionEntityOu>{
        return this.seccionDatasource.findAll();
    }

}