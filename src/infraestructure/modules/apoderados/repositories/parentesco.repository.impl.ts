import { ParentescoDatasource, ParentescoEntityOu, ParentescoRepository,RegisterParentescoDto } from "../../../../domain/index.js";
// import { UpdateParentescoDto } from "../../../../domain/modules/parentescos/dtos/update.Parentesco.dto.js";

export class ParentescoRepositoryImpl implements ParentescoRepository {

    constructor(
        private readonly ParentescoDatasource: ParentescoDatasource,
    ){}

    register(registerParentescoDto: RegisterParentescoDto, by:string): Promise<ParentescoEntityOu> {
        return this.ParentescoDatasource.register(registerParentescoDto,by);
    }

    // findById(id:string):Promise<ParentescoEntityOu>{
    //    return this.ParentescoDatasource.findById(id);
    // }

    findAll():Promise<ParentescoEntityOu>{
        return this.ParentescoDatasource.findAll();
    }

    // findAllColegio(id_colegio:string):Promise<ParentescoEntityOu>{
    //     return this.ParentescoDatasource.findAllColegio(id_colegio);
    // }

    findAllActive(): Promise<ParentescoEntityOu> {
        return this.ParentescoDatasource.findAllActive();
    }

    // updateAll(updateParentescoDto: UpdateParentescoDto, by: string): Promise<ParentescoEntityOu> {
    //     return this.ParentescoDatasource.updateAll(updateParentescoDto,by)
    // }

}