import { RegisterAcademicoDto } from "../dtos/register.academico.dto.js";
import { AcademicoEntityOu } from "../entities/ou/academico.entity.js";

export abstract class AcademicoRepository {

    abstract register(registerAcademicoDto:RegisterAcademicoDto,by:string): Promise<AcademicoEntityOu>;
    // abstract findById(id:string):Promise<AcademicoEntityOu>;
    abstract findAll():Promise<AcademicoEntityOu>;
    abstract findAllActive():Promise<AcademicoEntityOu>;
    abstract findAllActiveActual():Promise<AcademicoEntityOu>;
}