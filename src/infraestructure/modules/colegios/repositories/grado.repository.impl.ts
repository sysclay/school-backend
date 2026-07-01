// import {  GradoDatasource, GradoEntityOu, GradoRepository, RegisterGradoDto} from "../../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

import { GradoDatasource, GradoEntityOu, GradoRepository, RegisterGradoDto, UpdateGradoDto } from "../../../../domain/index.js";

export class GradoRepositoryImpl implements GradoRepository {

    constructor(
        private readonly gradoDatasource: GradoDatasource,
    ){}

    register(registerGradoDto: RegisterGradoDto,by:string): Promise<GradoEntityOu> {
        return this.gradoDatasource.register(registerGradoDto,by);
    } 

    findById(id:string):Promise<GradoEntityOu>{
       return this.gradoDatasource.findById(id);
    }

    findAll():Promise<GradoEntityOu>{
        return this.gradoDatasource.findAll();
    }

    updateAll(id: string, updateGradoDto: UpdateGradoDto, by: string): Promise<GradoEntityOu> {
        return this.gradoDatasource.updateAll(id,updateGradoDto,by)
    }

}