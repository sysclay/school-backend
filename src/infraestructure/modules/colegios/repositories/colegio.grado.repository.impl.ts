
import { ColegioGradoDatasource, ColegioGradoEntityOu, ColegioGradoRepository, FilterColegioGradoDto, RegisterColegioGradoDto, UpdateColegioGradoDto } from "../../../../domain/index.js";

export class ColegioGradoRepositoryImpl implements ColegioGradoRepository {

    constructor(
        private readonly ColegioGradoDatasource: ColegioGradoDatasource,
    ){}

    register(registerColegioGradoDto: RegisterColegioGradoDto, by:string): Promise<ColegioGradoEntityOu> {
        return this.ColegioGradoDatasource.register(registerColegioGradoDto,by);
    } 

    findByIdColegio(id:string):Promise<ColegioGradoEntityOu>{
       return this.ColegioGradoDatasource.findByIdColegio(id);
    }

    findAll(page:number, limit:number):Promise<ColegioGradoEntityOu>{
        return this.ColegioGradoDatasource.findAll(page, limit);
    }

    filter(filterColegioGradoDto:FilterColegioGradoDto):Promise<ColegioGradoEntityOu>{
        return this.ColegioGradoDatasource.filter(filterColegioGradoDto);
    }
    

    updateIsActive(udateColegioGradoDto: UpdateColegioGradoDto, by: string): Promise<ColegioGradoEntityOu> {
        return this.ColegioGradoDatasource.updateIsActive(udateColegioGradoDto,by)
    }

}