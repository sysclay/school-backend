// import {  NivelDatasource, NivelEntityOu, NivelRepository, RegisterNivelDto} from "../../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

import { NivelDatasource, NivelEntityOu, NivelRepository, RegisterNivelDto, UpdateNivelDto } from "../../../../domain/index.js";

export class NivelRepositoryImpl implements NivelRepository {

    constructor(
        private readonly NivelDatasource: NivelDatasource,
    ){}

    register(registerNivelDto: RegisterNivelDto,by:string): Promise<NivelEntityOu> {
        return this.NivelDatasource.register(registerNivelDto,by);
    } 

    findById(id:string):Promise<NivelEntityOu>{
       return this.NivelDatasource.findById(id);
    }

    findAll():Promise<NivelEntityOu>{
        return this.NivelDatasource.findAll();
    }

    findAllActive(): Promise<NivelEntityOu> {
        return this.NivelDatasource.findAllActive()
    }

    updateAll(id: string, updateNivelDto: UpdateNivelDto, by: string): Promise<NivelEntityOu> {
        return this.NivelDatasource.updateAll(id, updateNivelDto, by)
    }

}