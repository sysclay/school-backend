import { RegisterTipoDocumentoDto } from "../dtos/tipodocumento/register.tipo.documento.dto.js";
import { TipoDocumentoEntityOu } from "../entities/ou/tipo.documento.entity.js";

export abstract class TipoDocumentoRepository {

    abstract register(registerTipoDocumentoDto:RegisterTipoDocumentoDto): Promise<TipoDocumentoEntityOu>;
    abstract findById(id:string):Promise<TipoDocumentoEntityOu|null>;
    abstract findByNameCorto(nom_corto:string):Promise<TipoDocumentoEntityOu|null>;
    abstract findAll():Promise<TipoDocumentoEntityOu|null>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}