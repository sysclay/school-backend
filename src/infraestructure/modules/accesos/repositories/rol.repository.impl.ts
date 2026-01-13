import {  RolDatasource, RolEntityOu, RolRepository, RegisterRolDto,} from "../../../../domain/index.js";

export class RolRepositoryImpl implements RolRepository {

    constructor(
        private readonly rolDatasource: RolDatasource,
    ){}

    register(registerRolDto: RegisterRolDto,by:string): Promise<RolEntityOu> {
        return this.rolDatasource.register(registerRolDto,by);
    }

    //findById(id:string):Promise<RolEntityOu|null>{
    //    return this.RolDatasource.findById(id);
    //}
//
    findAll():Promise<RolEntityOu>{
        return this.rolDatasource.findAll();
    }

    // filterAll(filterRolDto:FilterRolDto):Promise<RolEntityOu>{
    //     return this.rolDatasource.filterAll(filterRolDto);
    // }

    
    // asignado(id:string):Promise<RolEntityOu>{
    //     return this.rolDatasource.asignado(id);
    // }


    // registerRolPersonaColegio(registerRolPersonaColegioDto:RegisterRolPersonaColegioDto,by:string):Promise<RolEntityOu>{
    //     return this.rolDatasource.registerRolPersonaColegio(registerRolPersonaColegioDto,by)
    // }

    // listRolesAsignados(): Promise<RolAsignadoEntityOu> {
    //     return this.rolDatasource.listRolesAsignados();
    // }

    // asignarRolPermisoModulo(asignarRolPermisoModuloDto:AsignarRolPermisoModuloDto,by:string):Promise<RolEntityOu>{
    //     return this.rolDatasource.asignarRolPermisoModulo(asignarRolPermisoModuloDto,by);
    // }

}