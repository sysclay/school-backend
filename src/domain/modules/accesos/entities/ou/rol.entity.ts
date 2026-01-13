export class RolEntity {
    constructor(
        public id_rol: string,
        public codigo_rol: string,
        public nombre_rol: string,
        public descripcion: string,
        public estado: boolean,
        public cantidad_permisos?: number,
        public cantidad_personas?: number,
    ){}
}

export class RolEntityOu {
    constructor (
        public ok:boolean,
        public data: RolEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}