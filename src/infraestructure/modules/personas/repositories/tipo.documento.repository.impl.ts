import {  TipoDocumentoDatasource, TipoDocumentoEntityOu, TipoDocumentoRepository, RegisterTipoDocumentoDto} from "../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class TipoDocumentoRepositoryImpl implements TipoDocumentoRepository {

    constructor(
        private readonly tipoDocumentoDatasource: TipoDocumentoDatasource,
    ){}

    register(registerTipoDocumentoDto: RegisterTipoDocumentoDto): Promise<TipoDocumentoEntityOu> {
        return this.tipoDocumentoDatasource.register(registerTipoDocumentoDto);
    } 

    findById(id:string):Promise<TipoDocumentoEntityOu|null>{
        return this.tipoDocumentoDatasource.findById(id);
    }

    findByNameCorto(nom_corto:string):Promise<TipoDocumentoEntityOu|null>{
        return this.tipoDocumentoDatasource.findByNameCorto(nom_corto);
    };

    findAll():Promise<TipoDocumentoEntityOu|null>{
        return this.tipoDocumentoDatasource.findAll();
    }

}