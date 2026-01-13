import { PermisoDatasource, PermisoEntityOu, PermisoRepository, RegisterPermisoDto, UpdatePermisoDto } from "../../../../domain/index.js";
// import { RegisterTipoUsuarioDto } from "../../domain/dtos/tipousuario/register.usuario.dto";

export class PermisoRepositoryImpl implements PermisoRepository {

    constructor(
        private readonly permisoDatasource: PermisoDatasource,
    ){}

    // REGISTRAR PERMISO
    register(registerPermisoDto: RegisterPermisoDto,by:string): Promise<PermisoEntityOu> {
        return this.permisoDatasource.register(registerPermisoDto,by);
    }

    // LISTAR PERMISOS
    findAll(): Promise<PermisoEntityOu> {
        return this.permisoDatasource.findAll();
    }

    // ACTUALIZAR PERMISO
    updateAll(id:string,updatePermisoDto:UpdatePermisoDto,by:string): Promise<PermisoEntityOu> {
        return this.permisoDatasource.updateAll(id,updatePermisoDto,by);
    }


}       