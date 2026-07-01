export class ModuloEntity {
    constructor(
        public id_modulo: string,
        public codigo_modulo: string,
        public nombre_modulo: string,
        public descripcion: string,
        public estado: string,
    ){}
}

export class ModuloEntityOu {
    constructor (
        public ok:boolean,
        public data: ModuloEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}