

import { RegisterRolPermisoModuloDto } from "../dtos/register.rol.permiso.modulo.dto.js";
import { RolPermisoModuloEntityOu } from "../entities/ou/rol.permiso.modulo.entity.js";

export abstract class RolPermisoModuloRepository {

    abstract register(registerRolPermisoModuloDto:RegisterRolPermisoModuloDto,by:string): Promise<RolPermisoModuloEntityOu>;
    abstract findAll():Promise<RolPermisoModuloEntityOu>;

}