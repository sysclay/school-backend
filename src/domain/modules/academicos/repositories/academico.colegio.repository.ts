import { FilterAcademicoColegioDto } from "../dtos/filter.academico.colegio.dto.js";
import { RegisterAcademicoColegioDto } from "../dtos/register.academico.colegio.dto.js";
import { AcademicoColegioEntityOu } from "../entities/ou/academico.colegio.entity.js";

export abstract class AcademicoColegioRepository {

    abstract register(registerAcademicoColegioDto:RegisterAcademicoColegioDto,by:string): Promise<AcademicoColegioEntityOu>;
    abstract findById(id:string):Promise<AcademicoColegioEntityOu>;

    abstract findAll():Promise<AcademicoColegioEntityOu>;
    abstract findAllActive(page:number, limit:number):Promise<AcademicoColegioEntityOu>;
    abstract filter(filterAcademicoColegioDto:FilterAcademicoColegioDto):Promise<AcademicoColegioEntityOu>;


}