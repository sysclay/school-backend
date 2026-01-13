import {  ModuloDatasource, ModuloEntityOu, ModuloRepository, RegisterModuloDto, UpdateModuloDto} from "../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class ModuloRepositoryImpl implements ModuloRepository {

    constructor(
        private readonly moduloDatasource: ModuloDatasource,
    ){}

    register(registerTablaDto: RegisterModuloDto, by:string): Promise<ModuloEntityOu> {
        return this.moduloDatasource.register(registerTablaDto,by);
    } 

    // findById(id:string):Promise<TablaEntityOu>{
    //     return this.TablaDatasource.findById(id);
    // }

    // findByNDoc(ndoc:string): Promise<TablaEntityOu> {
    //     return this.TablaDatasource.findByNDoc(ndoc);
    // }

    findAll():Promise<ModuloEntityOu>{
        return this.moduloDatasource.findAll();
    }

    // filterAll(filterTablaDto:FilterTablaDto):Promise<TablaEntityOu>{
    //     return this.TablaDatasource.filterAll(filterTablaDto);
    // }

    updateAll(id:string, updateModuloDto:UpdateModuloDto, by:string):Promise<ModuloEntityOu>{
        return this.moduloDatasource.updateAll(id,updateModuloDto,by);
    }

}