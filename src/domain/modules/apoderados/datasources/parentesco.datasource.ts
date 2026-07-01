
import { RegisterParentescoDto } from "../dtos/register.parentesco.dto.js";
import { ParentescoEntityOu } from "../entities/ou/parentesco.entity.js";

export abstract class ParentescoDatasource {

    abstract register(registerParentescoDto:RegisterParentescoDto, by:string): Promise<ParentescoEntityOu>;
    // abstract register(): Promise<any>;
    // abstract findById(id:string):Promise<ParentescoEntityOu>;
    abstract findAll():Promise<ParentescoEntityOu>;
    abstract findAllActive():Promise<ParentescoEntityOu>;
}