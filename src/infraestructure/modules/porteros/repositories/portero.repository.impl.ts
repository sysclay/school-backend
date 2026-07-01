import { PorteroDatasource, PorteroEntityOu, PorteroRepository, FilterPorteroDto, FilterPorteroEntityOu, RegisterPorteroDto } from "../../../../domain/index.js";
// import { UpdatePorteroDto } from "../../../../domain/modules/porteros/dtos/update.Portero.dto.js";

export class PorteroRepositoryImpl implements PorteroRepository {

    constructor(
        private readonly PorteroDatasource: PorteroDatasource,
    ){}

    register(registerPorteroDto: RegisterPorteroDto, by:string): Promise<PorteroEntityOu> {
        return this.PorteroDatasource.register(registerPorteroDto,by);
    }

    findById(id:string):Promise<PorteroEntityOu>{
       return this.PorteroDatasource.findById(id);
    }

    findAll():Promise<PorteroEntityOu>{
        return this.PorteroDatasource.findAll();
    }

    findAllColegio(id_colegio:string):Promise<PorteroEntityOu>{
        return this.PorteroDatasource.findAllColegio(id_colegio);
    }

    filterAll(filterPorteroDto: FilterPorteroDto): Promise<PorteroEntityOu> {
        return this.PorteroDatasource.filterAll(filterPorteroDto);
    }

    // updateAll(updatePorteroDto: UpdatePorteroDto, by: string): Promise<PorteroEntityOu> {
    //     return this.PorteroDatasource.updateAll(updatePorteroDto,by)
    // }

}