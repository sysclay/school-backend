import { RegisterAcademicoDto } from "../dtos/register.academico.dto.js";
import { AcademicoEntityOu } from "../entities/ou/academico.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class AcademicoDatasource {

    abstract register(registerAcademicoDto:RegisterAcademicoDto, by:string): Promise<AcademicoEntityOu>;
    // abstract findById(id:string):Promise<AcademicoEntityOu>;
    abstract findAll():Promise<AcademicoEntityOu>;
    abstract findAllActive():Promise<AcademicoEntityOu>;
    abstract findAllActiveActual():Promise<AcademicoEntityOu>;

}