// import {  ColegioDatasource, ColegioEntityOu, ColegioRepository, RegisterColegioDto} from "../../../../domain/modulos/colegio/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

import { ColegioDatasource, ColegioEntityOu, ColegioNivelEntityOu, ColegioRepository, RegisterColegioDto } from "../../../../domain/index.js";
import { UpdateColegioDto } from "../../../../domain/modules/colegios/dtos/update.colegio.dto.js";

export class ColegioRepositoryImpl implements ColegioRepository {

    constructor(
        private readonly colegioDatasource: ColegioDatasource,
    ){}

    register(registerColegioDto: RegisterColegioDto, by:string): Promise<ColegioEntityOu> {
        return this.colegioDatasource.register(registerColegioDto,by);
    } 

    findById(id:string):Promise<ColegioEntityOu>{
       return this.colegioDatasource.findById(id);
    }

    findAll(page:number, limit:number):Promise<ColegioEntityOu>{
        return this.colegioDatasource.findAll(page, limit);
    }

    findAllActive(page: number, limit: number): Promise<ColegioEntityOu> {
        return this.colegioDatasource.findAllActive(page, limit);
    }

    findOne(id: string): Promise<ColegioEntityOu> {
        return this.colegioDatasource.findOne(id);
    }

    updateAll(updateColegioDto: UpdateColegioDto, by: string): Promise<ColegioEntityOu> {
        return this.colegioDatasource.updateAll(updateColegioDto,by)
    }

}