
import { ColegioSeccionDatasource, ColegioSeccionEntityOu, ColegioSeccionRepository, FilterColegioSeccionDto, RegisterColegioSeccionDto, UpdateColegioSeccionDto } from "../../../../domain/index.js";

export class ColegioSeccionRepositoryImpl implements ColegioSeccionRepository {

    constructor(
        private readonly ColegioSeccionDatasource: ColegioSeccionDatasource,
    ){}

    register(registerColegioSeccionDto: RegisterColegioSeccionDto, by:string): Promise<ColegioSeccionEntityOu> {
        return this.ColegioSeccionDatasource.register(registerColegioSeccionDto,by);
    } 

    findByIdColegio(id:string, estado:boolean):Promise<ColegioSeccionEntityOu>{
       return this.ColegioSeccionDatasource.findByIdColegio(id, estado);
    }

    findAll(page:number, limit:number):Promise<ColegioSeccionEntityOu>{
        return this.ColegioSeccionDatasource.findAll(page, limit);
    }

    filter(filterColegioSeccionDto:FilterColegioSeccionDto):Promise<ColegioSeccionEntityOu>{
        return this.ColegioSeccionDatasource.filter(filterColegioSeccionDto);
    }

    updateIsActive(updateColegioSeccionDto: UpdateColegioSeccionDto, by: string): Promise<ColegioSeccionEntityOu> {
        return this.ColegioSeccionDatasource.updateIsActive(updateColegioSeccionDto, by);
    }

}