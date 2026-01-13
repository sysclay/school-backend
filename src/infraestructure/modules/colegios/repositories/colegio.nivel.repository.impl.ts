
import { ColegioNivelDatasource, ColegioNivelEntityOu, ColegioNivelRepository, FilterAcademicoColegioDto, FilterColegioNivelDto, RegisterColegioNivelDto, UpdateColegioNivelDto } from "../../../../domain/index.js";

export class ColegioNivelRepositoryImpl implements ColegioNivelRepository {

    constructor(
        private readonly colegioNivelDatasource: ColegioNivelDatasource,
    ){}

    register(registerColegioNivelDto: RegisterColegioNivelDto,by:string): Promise<ColegioNivelEntityOu> {
        return this.colegioNivelDatasource.register(registerColegioNivelDto,by);
    } 

    findByIdColegio(id:string):Promise<ColegioNivelEntityOu>{
       return this.colegioNivelDatasource.findByIdColegio(id);
    }

    findAll(page:number, limit:number):Promise<ColegioNivelEntityOu>{
        return this.colegioNivelDatasource.findAll(page, limit);
    }

    filter(filterColegioNivelDto:FilterColegioNivelDto):Promise<ColegioNivelEntityOu>{
        return this.colegioNivelDatasource.filter(filterColegioNivelDto);
    }

    updateIsActive(updateColegioNivelDto:UpdateColegioNivelDto,by:string):Promise<ColegioNivelEntityOu>{
        return this.colegioNivelDatasource.updateIsActive(updateColegioNivelDto,by);
    }

}