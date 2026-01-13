import { ApoderadoDatasource, ApoderadoEntityOu, ApoderadoRepository, FilterApoderadoDto, FilterApoderadoEntityOu, RegisterApoderadoDto } from "../../../../domain/index.js";
// import { UpdateApoderadoDto } from "../../../../domain/modules/apoderados/dtos/update.Apoderado.dto.js";

export class ApoderadoRepositoryImpl implements ApoderadoRepository {

    constructor(
        private readonly ApoderadoDatasource: ApoderadoDatasource,
    ){}

    register(registerApoderadoDto: RegisterApoderadoDto, by:string): Promise<ApoderadoEntityOu> {
        return this.ApoderadoDatasource.register(registerApoderadoDto,by);
    }

    findById(id:string):Promise<ApoderadoEntityOu>{
       return this.ApoderadoDatasource.findById(id);
    }

    findAll():Promise<ApoderadoEntityOu>{
        return this.ApoderadoDatasource.findAll();
    }

    findAllColegio(id_colegio:string):Promise<ApoderadoEntityOu>{
        return this.ApoderadoDatasource.findAllColegio(id_colegio);
    }

    filterAll(filterApoderadoDto: FilterApoderadoDto): Promise<ApoderadoEntityOu> {
        return this.ApoderadoDatasource.filterAll(filterApoderadoDto);
    }

    // updateAll(updateApoderadoDto: UpdateApoderadoDto, by: string): Promise<ApoderadoEntityOu> {
    //     return this.ApoderadoDatasource.updateAll(updateApoderadoDto,by)
    // }

}