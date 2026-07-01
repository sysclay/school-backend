
import { FilterRolDto } from "../dtos/filter.rol.dto.js";
import { RegisterRolDto } from "../dtos/register.rol.dto.js";
import { RegisterRolPersonaColegioDto } from "../dtos/register.rol.persona.colegio.dto.js";
import { RolEntityOu } from "../entities/ou/rol.entity.js";
// import { RolAsignadoEntityOu } from "../entities/ou/rol.asignado.entity.js";
// import { AsignarRolPermisoModuloDto } from "../dtos/asignar.rol.permiso.modulo.dto.js";
// import { UpdateEntityMessage } from "../entities/output/update.entity";

export abstract class RolDatasource {

    abstract register(registerRolDto:RegisterRolDto,by:string): Promise<RolEntityOu>;
    abstract findAll():Promise<RolEntityOu>;
    // abstract filterAll(filterRolDto:FilterRolDto):Promise<RolEntityOu>;



    // abstract asignado(id:string):Promise<RolEntityOu>;
    // abstract registerRolPersonaColegio(registerRolPersonaColegioDto:RegisterRolPersonaColegioDto, by:string):Promise<RolEntityOu>;
    // abstract listRolesAsignados():Promise<RolAsignadoEntityOu>;
    // abstract asignarRolPermisoModulo(asignarRolPermisoModuloDto:AsignarRolPermisoModuloDto,by:string):Promise<RolEntityOu>;



    // abstract seleccion(seleccionRolDto:SeleccionRolDto):Promise<RolEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateStationDto): Promise<UpdateEntityMessage>;

}