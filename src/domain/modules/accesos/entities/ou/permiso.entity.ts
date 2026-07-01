export class PermisoEntity {
    constructor(
        public id_permiso: string,
        public codigo_permiso: string,
        public nombre_permiso: string,
        public descripcion: string,
        public estado: boolean,
    ){}
}

export class PermisoEntityOu {
    constructor (
        public ok:boolean,
        public data: PermisoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}