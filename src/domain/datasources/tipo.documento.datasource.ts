import { RegisterTipoDocumentoDto } from "../dtos/tipodocumento/register.tipo.documento.dto.js";
import { TipoDocumentoEntityOu } from "../entities/ou/tipo.documento.entity.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class TipoDocumentoDatasource {

    abstract register(registerTipoDocumentoDto:RegisterTipoDocumentoDto): Promise<TipoDocumentoEntityOu>;
    // abstract register(): Promise<any>;
    abstract findById(id:string):Promise<TipoDocumentoEntityOu|null>;
    abstract findByNameCorto(nom_corto:string):Promise<TipoDocumentoEntityOu|null>;
    abstract findAll():Promise<TipoDocumentoEntityOu|null>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}