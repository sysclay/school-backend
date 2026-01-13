import {  GeneroDatasource, GeneroEntityOu, GeneroRepository, RegisterGeneroDto} from "../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class GeneroRepositoryImpl implements GeneroRepository {

    constructor(
        private readonly GeneroDatasource: GeneroDatasource,
    ){}

    register(registerGeneroDto: RegisterGeneroDto, by:string): Promise<GeneroEntityOu> {
        return this.GeneroDatasource.register(registerGeneroDto,by);
    } 

    findById(id:string):Promise<GeneroEntityOu>{
        return this.GeneroDatasource.findById(id);
    }

    // findByNDoc(ndoc:string): Promise<GeneroEntityOu> {
    //     return this.GeneroDatasource.findByNDoc(ndoc);
    // }

    findAll():Promise<GeneroEntityOu>{
        return this.GeneroDatasource.findAll();
    }

    // filterAll(filterGeneroDto:FilterGeneroDto):Promise<GeneroEntityOu>{
    //     return this.GeneroDatasource.filterAll(filterGeneroDto);
    // }

    // updateQR(id:string):Promise<GeneroEntityOu|null>{
    //     return this.GeneroDatasource.updateQR(id);
    // }

}