import { AcademicoDatasource, AcademicoEntityOu, AcademicoRepository, RegisterAcademicoDto} from "../../../../domain/index.js";
// import { RegisterTipoRolDto } from "../../domain/dtos/tipoRol/register.Rol.dto";

export class AcademicoRepositoryImpl implements AcademicoRepository {

    constructor(
        private readonly AcademicoDatasource:AcademicoDatasource,
    ){}

    register(registerAcademicoDto: RegisterAcademicoDto, by: string): Promise<AcademicoEntityOu> {
        return this.AcademicoDatasource.register(registerAcademicoDto,by);
    }

    findAll():Promise<AcademicoEntityOu>{
        return this.AcademicoDatasource.findAll();
    }

    findAllActive(): Promise<AcademicoEntityOu> {
        return this.AcademicoDatasource.findAllActive();
    }

    findAllActiveActual(): Promise<AcademicoEntityOu> {
        return this.AcademicoDatasource.findAllActiveActual();
    }

    // findById(id: string): Promise<AcademicoEntityOu> {
    //     return this.AcademicoDatasource.findById(id)
    // }



}