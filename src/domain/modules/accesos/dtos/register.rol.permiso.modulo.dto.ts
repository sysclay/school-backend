export class RegisterRolPermisoModuloDto {
    private constructor (
        public id_rol: string,
        public id_permiso: string,
        public id_modulo: string,
        public estado: boolean,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterRolPermisoModuloDto?]{
        const { id_rol, id_permiso, id_modulo, estado} = object;
        if(!id_rol) return ["Missing rol"];
        if(!id_permiso) return ["Missing permiso"];
        if(!id_modulo) return ["Missing modulo"];
        if(estado !== true && estado !== false) return ["Estado debe ser true o false"];

        return [
            undefined,
            new RegisterRolPermisoModuloDto( id_rol, id_permiso, id_modulo, estado),
        ]
    }
}