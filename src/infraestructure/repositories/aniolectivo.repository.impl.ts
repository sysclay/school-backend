import {  AniolectivoDatasource, AniolectivoEntityOu, AniolectivoRepository, RegisterAniolectivoDto} from "../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class AniolectivoRepositoryImpl implements AniolectivoRepository {

    constructor(
        private readonly aniolectivoDatasource: AniolectivoDatasource,
    ){}

    register(registerAniolectivoDto: RegisterAniolectivoDto): Promise<AniolectivoEntityOu> {
        return this.aniolectivoDatasource.register(registerAniolectivoDto);
    } 

    //findById(id:string):Promise<AniolectivoEntityOu|null>{
    //    return this.AniolectivoDatasource.findById(id);
    //}
//
    findAll():Promise<AniolectivoEntityOu>{
        return this.aniolectivoDatasource.findAll();
    }

}