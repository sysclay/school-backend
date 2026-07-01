
import { FilterRolDto } from "../dtos/filter.rol.dto.js";
import { RegisterRolDto } from "../dtos/register.rol.dto.js";
import { RolEntityOu } from "../entities/ou/rol.entity.js";

export abstract class RolRepository {

    abstract register(registerRolDto:RegisterRolDto,by:string): Promise<RolEntityOu>;
    abstract findAll():Promise<RolEntityOu>;
    // abstract filterAll(filterRolDto:FilterRolDto):Promise<RolEntityOu>;

    // abstract asignado(id:string):Promise<RolEntityOu>;

    // abstract registerRolPersonaColegio(registerRolPersonaColegioDto:RegisterRolPersonaColegioDto,by:string):Promise<RolEntityOu>;
    // abstract listRolesAsignados():Promise<RolAsignadoEntityOu>;
    // abstract asignarRolPermisoModulo(asignarRolPermisoModuloDto:AsignarRolPermisoModuloDto,by:string):Promise<RolEntityOu>;
    // abstract seleccion(seleccionRolDto:SeleccionRolDto):Promise<RolEntityOu>;
    //abstract updateAll(id:string,updateStationDto:UpdateRolDto): Promise<UpdateEntityMessage>;
}