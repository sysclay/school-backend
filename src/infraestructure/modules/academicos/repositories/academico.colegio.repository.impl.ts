import { AcademicoColegioDatasource, AcademicoColegioEntityOu, AcademicoColegioRepository, FilterAcademicoColegioDto, RegisterAcademicoColegioDto} from "../../../../domain/index.js";
// import { RegisterTipoRolDto } from "../../domain/dtos/tipoRol/register.Rol.dto";

export class AcademicoColegioRepositoryImpl implements AcademicoColegioRepository {

    constructor(
        private readonly AcademicoColegioDatasource:AcademicoColegioDatasource,
    ){}

    register(registerAcademicoColegioDto: RegisterAcademicoColegioDto, by: string): Promise<AcademicoColegioEntityOu> {
        return this.AcademicoColegioDatasource.register(registerAcademicoColegioDto,by);
    }

    findAll():Promise<AcademicoColegioEntityOu>{
        return this.AcademicoColegioDatasource.findAll();
    }

    findAllActive(page:number, limit:number): Promise<AcademicoColegioEntityOu> {
        return this.AcademicoColegioDatasource.findAllActive(page,limit);
    }

    filter(filterAcademicoColegioDto: FilterAcademicoColegioDto): Promise<AcademicoColegioEntityOu> {
        return this.AcademicoColegioDatasource.filter(filterAcademicoColegioDto);
    }

    findById(id: string): Promise<AcademicoColegioEntityOu> {
        return this.AcademicoColegioDatasource.findById(id);
    }

}