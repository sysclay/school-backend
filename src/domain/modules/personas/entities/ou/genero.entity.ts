export class GeneroEntity {
    constructor(
        public id_genero: string,
        public nom_gen: string,
        public nom_abr: string,
        public estado: boolean,
    ){}
}

export class GeneroEntityOu {
    constructor (
        public ok:boolean,
        public data: GeneroEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}