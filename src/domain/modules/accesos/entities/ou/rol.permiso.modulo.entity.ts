export class RolPermisoModuloEntity {
    constructor(
        public id_rol: string,
        public id_modulo: string,
        public id_permiso: string,
        public nombre_rol: string,
        public nombre_modulo: string,
        public nombre_permiso: string,
        public created_at: string,
        public estado: boolean,
    ){}
}

export class RolPermisoModuloEntityOu {
    constructor (
        public ok:boolean,
        public data: RolPermisoModuloEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}