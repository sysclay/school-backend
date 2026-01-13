export class NivelEntity {
    constructor(
        public id_nivel: string,
        public codigo: string,
        public nivel: string,
        public descripcion: string,
        public estado: boolean,
        public cantidad_grado: number,
    ){}
}

export class NivelEntityOu {
    constructor (
        public ok:boolean,
        public data: NivelEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}