// import {  SeccionDatasource, SeccionEntityOu, SeccionRepository, RegisterSeccionDto} from "../../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

import { SeccionDatasource, SeccionEntityOu, SeccionRepository, RegisterSeccionDto, UpdateSeccionDto } from "../../../../domain/index.js";

export class SeccionRepositoryImpl implements SeccionRepository {

    constructor(
        private readonly seccionDatasource: SeccionDatasource,
    ){}

    register(registerSeccionDto: RegisterSeccionDto,by:string): Promise<SeccionEntityOu> {
        return this.seccionDatasource.register(registerSeccionDto,by);
    } 

    //findById(id:string):Promise<SeccionEntityOu|null>{
    //    return this.SeccionDatasource.findById(id);
    //}
//
    findAll():Promise<SeccionEntityOu>{
        return this.seccionDatasource.findAll();
    }

    updateAll(id: string, updateSeccionDto: UpdateSeccionDto, by: string): Promise<SeccionEntityOu> {
        return this.seccionDatasource.updateAll(id,updateSeccionDto,by)
    }

}