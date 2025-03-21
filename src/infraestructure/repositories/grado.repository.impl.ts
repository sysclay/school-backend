import {  GradoDatasource, GradoEntityOu, GradoRepository, RegisterGradoDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class GradoRepositoryImpl implements GradoRepository {

    constructor(
        private readonly gradoDatasource: GradoDatasource,
    ){}

    register(registerGradoDto: RegisterGradoDto): Promise<GradoEntityOu> {
        return this.gradoDatasource.register(registerGradoDto);
    } 

    //findById(id:string):Promise<GradoEntityOu|null>{
    //    return this.GradoDatasource.findById(id);
    //}
//
    findAll():Promise<GradoEntityOu>{
        return this.gradoDatasource.findAll();
    }

}