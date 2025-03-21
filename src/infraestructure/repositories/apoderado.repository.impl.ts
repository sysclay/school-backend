import {  ApoderadoDatasource, ApoderadoEntityOu, ApoderadoRepository, RegisterApoderadoDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class ApoderadoRepositoryImpl implements ApoderadoRepository {

    constructor(
        private readonly ApoderadoDatasource: ApoderadoDatasource,
    ){}

    register(registerApoderadoDto: RegisterApoderadoDto): Promise<ApoderadoEntityOu> {
        return this.ApoderadoDatasource.register(registerApoderadoDto);
    } 

    findById(id:string):Promise<ApoderadoEntityOu>{
        return this.ApoderadoDatasource.findById(id);
    }

    findAll():Promise<ApoderadoEntityOu>{
        return this.ApoderadoDatasource.findAll();
    }

}